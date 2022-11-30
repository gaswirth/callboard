<?php
/**
 * GraphQL mutations.
 *
 * @package Callboard
 * @subpackage Callboard/includes
 *
 * @since 0.0.1
 */

/**
 * Callboard_GraphQL_Mutations class.
 *
 * @package Callboard
 * @subpackage Callboard/includes
 *
 * @since 0.0.1
 */
class Callboard_GraphQL_Mutations extends Callboard_GraphQL {
	/**
	 * Register GraphQL mutations.
	 *
	 * @since 0.0.1
	 */
	public function register_mutations() {
		$this->register_login_mutation();
		$this->register_logout_mutation();
		$this->register_new_show_mutation();
		$this->register_update_show_attendance_mutation();
		$this->register_update_show_notes_mutation();
		$this->register_update_company_member_mutation();
		$this->register_new_company_member_mutation();
	}

	/**
	 * Login mutation with HTTP Cookies.
	 *
	 * @since 0.0.1
	 *
	 * @return void
	 */
	protected function register_login_mutation() {
		register_graphql_mutation(
			'login',
			[
				'inputFields'         => [
					'login'    => [
						'type'        => ['non_null' => 'String'],
						'description' => __( 'Input your username/email.' ),
					],
					'password' => [
						'type'        => ['non_null' => 'String'],
						'description' => __( 'Input your password.' ),
					],
				],
				'outputFields'        => [
					'status' => [
						'type'        => 'String',
						'description' => __( 'Login operation status', 'callboard' ),
						'resolve'     => function ( $payload ) {
							return $payload['status'];
						},
					],
					'userId' => [
						'type'        => 'String',
						'description' => __( 'User ID', 'callboard' ),
						'resolve'     => function ( $payload ) {
							return $payload['userId'];
						},
					],
					'roles'  => [
						'type'        => 'String',
						'description' => __( 'The user\'s roles', 'callboard' ),
						'resolve'     => function ( $payload ) {
							return $payload['roles'];
						},
					],
				],
				'mutateAndGetPayload' => function ( $input ) {
					$user = wp_signon(
						[
							'user_login'    => wp_unslash( $input['login'] ),
							'user_password' => $input['password'],
							'remember'      => true,
						],
						true
					);

					if ( is_wp_error( $user ) ) {
						throw new \GraphQL\Error\UserError( ! empty( $user->get_error_code() ) ? $user->get_error_code() : __( 'Invalid login', 'callboard' ) );
					}

					return [
						'status' => 'SUCCESS',
						'userId' => $user->ID,
						'roles'  => implode( ',', $user->roles ),
					];
				},
			]
		);
	}

	/**
	 * Logout mutation.
	 *
	 * @since 0.0.1
	 *
	 * @return void
	 */
	protected function register_logout_mutation() {
		register_graphql_mutation(
			'logout',
			[
				'inputFields'         => [],
				'outputFields'        => [
					'status' => [
						'type'        => 'String',
						'description' => __( 'Logout result', 'callboard' ),
						'resolve'     => function ( $payload ) {
							return $payload['status'];
						},
					],
				],
				'mutateAndGetPayload' => function () {
					wp_logout(); // This destroys the WP Login cookie.
					return ['status' => 'SUCCESS'];
				},
			]
		);
	}

	/**
	 * Mutation for creating a new show.
	 *
	 * @since 0.0.1
	 *
	 * @return void
	 */
	protected function register_new_show_mutation() {
		register_graphql_mutation(
			'newShow',
			[
				'inputFields'         => [
					'description' => __( 'New Show data.', 'callboard' ),
					'datetime'    => [
						'type'        => 'String',
						'description' => __( 'Date and time string', 'callboard' ),
					],
					'title'       => [
						'type'        => 'String',
						'description' => __( 'Show Title/Number/ID.', 'callboard' ),
					],
					'notes'       => [
						'type'        => 'String',
						'description' => __( 'Show Notes.', 'callboard' ),
					],
				],
				'outputFields'        => [
					'showId' => [
						'type'        => 'ID',
						'description' => __( 'The newly created Show ID', 'callboard' ),
					],
				],
				'mutateAndGetPayload' => function ( $input ) {
					/**
					 * Make sure this datetime is unique.
					 */
					if ( Callboard_Show::check_unique_datetime( $input['datetime'] ) === false ) {
						throw new \GraphQL\Error\Error( __( 'A show already exists with that date and time', 'callboard' ) );
					}

					/**
					 * Create the new show.
					 */
					$new_show_id = wp_insert_post(
						[
							'post_type'   => 'show',
							'post_status' => 'publish',
							'post_title'  => $input['title'] ? sanitize_text_field( $input['title'] ) : '',
							'post_name'   => Callboard_Functions::generate_random_string( 8 ),
							'meta_input'  => [
								'datetime'   => Callboard_Functions::format_date_string( $input['datetime'] ),
								'notes'      => $input['notes'] ? sanitize_textarea_field( $input['notes'] ) : '',
								'attendance' => Callboard_Users::generate_new_show_attendance(),
							],
						]
					);

					return [
						'showId' => $new_show_id,
					];
				},
			]
		);
	}

	/**
	 * Mutation for updating a show's attendance status array.
	 *
	 * @since 0.0.1
	 *
	 * @return void
	 */
	protected function register_update_show_attendance_mutation() {
		register_graphql_mutation(
			'updateShowAttendance',
			[
				'inputFields'         => [
					'description'     => "A company member's status for a specific show.",
					'showId'          => [
						'type'        => 'ID',
						'description' => __( 'The show databaseId', 'callboard' ),
					],
					'companyMemberId' => [
						'type'        => 'ID',
						'description' => __( 'The user databaseId', 'callboard' ),
					],
					'status'          => [
						'type'        => 'String',
						'description' => __( 'The vacation status. One of: in, out, vac, pd.', 'callboard' ),
					],
				],
				'outputFields'        => [
					'newStatus' => [
						'type'        => 'String',
						'description' => __( 'The updated status.', 'callboard' ),
					],
				],
				'mutateAndGetPayload' => function ( $input ) {
					$attendance                                    = get_post_meta( $input['showId'], 'attendance', true );
					$updated_attendance                            = $attendance ? $attendance : [];
					$updated_attendance[$input['companyMemberId']] = $input['status'];

					$result = update_post_meta( $input['showId'], 'attendance', $updated_attendance );

					// If `update_post_meta` returns false, there was either an error, or the submitted value was identical.
					return [
						'newStatus' => $result ? $input['status'] : $attendance[$input['companyMemberId']],
					];
				},
			]
		);
	}

	/**
	 * Mutation for updating a Company Member's data.
	 *
	 * @since 0.0.1
	 *
	 * @return void
	 */
	public function register_update_show_notes_mutation() {
		register_graphql_mutation(
			'updateShowNotes',
			[
				'inputFields'         => [
					'description' => 'The show fields to update.',
					'id'          => [
						'type'        => 'ID',
						'description' => __( 'Show ID', 'callboard' ),
					],
					'notes'       => [
						'type'        => 'String',
						'description' => __( 'Show notes', 'callboard' ),
					],
				],
				'outputFields'        => [
					'updatedShowNotes' => [
						'type'        => 'String',
						'description' => __( 'The updated (sanitized) show notes.', 'callboard' ),
					],
				],
				'mutateAndGetPayload' => function ( $input ) {
					$show_id = absint( $input['id'] );

					$notes = $input['notes'] ? sanitize_textarea_field( $input['notes'] ) : '';

					// TODO Error handling
					if ( $notes ) {
						update_post_meta( $show_id, 'notes', $notes );
					} else {
						delete_post_meta( $show_id, 'notes' );
					}

					return [
						'newNotes' => $notes,
					];
				},
			]
		);
	}

	/**
	 * Mutation for updating a Company Member's data.
	 *
	 * @since 0.0.1
	 *
	 * @return void
	 */
	public function register_update_company_member_mutation() {
		register_graphql_mutation(
			'updateCompanyMember',
			[
				'inputFields'         => [
					'description' => 'The user fields to update.',
					'id'          => [
						'type'        => 'ID',
						'description' => __( 'User ID', 'callboard' ),
					],
					'firstName'   => [
						'type'        => 'String',
						'description' => __( 'First name', 'callboard' ),
					],
					'lastName'    => [
						'type'        => 'String',
						'description' => __( 'Last name', 'callboard' ),
					],
					'email'       => [
						'type'        => 'String',
						'description' => __( 'Email address', 'callboard' ),
					],
					'role'        => [
						'type'        => 'String',
						'description' => __( 'The public role to display on the frontend.', 'callboard' ),
					],
					'active'      => [
						'type'        => 'Boolean',
						'description' => __( 'Whether or not the Company Member is on the active roster.', 'callboard' ),
					],

				],
				'outputFields'        => [
					'updatedCompanyMember' => [
						'type'        => 'ID',
						'description' => __( 'The updated user ID.', 'callboard' ),
					],
				],
				'mutateAndGetPayload' => function ( $input ) {
					$result = wp_update_user( [
						'ID'         => absint( $input['id'] ),
						'first_name' => sanitize_text_field( $input['firstName'] ),
						'last_name'  => sanitize_text_field( $input['lastName'] ),
						'user_email' => sanitize_email( $input['email'] ),
						'meta_input' => [
							'callboard-role'   => sanitize_text_field( $input['role'] ),
							'callboard-active' => boolval( $input['active'] ),
						],
					] );

					if ( is_wp_error( $result ) ) {
						throw new \GraphQL\Error\UserError( ! empty( $result->get_error_code() ) ? $result->get_error_code() : __( 'Error updating user', 'callboard' ) );
					}

					return [
						'updatedCompanyMember' => $result,
					];
				},
			]
		);
	}

	/**
	 * Mutation for creating a new Company Member.
	 *
	 * @since 0.0.1
	 *
	 * @return void
	 */
	public function register_new_company_member_mutation() {
		register_graphql_mutation(
			'newCompanyMember',
			[
				'inputFields'         => [
					'description' => 'The user fields.',
					'firstName'   => [
						'type'        => 'String',
						'description' => __( 'First name', 'callboard' ),
					],
					'lastName'    => [
						'type'        => 'String',
						'description' => __( 'Last name', 'callboard' ),
					],
					'email'       => [
						'type'        => 'String',
						'description' => __( 'Email address', 'callboard' ),
					],
					'role'        => [
						'type'        => 'String',
						'description' => __( 'The public role to display on the frontend.', 'callboard' ),
					],
					'active'      => [
						'type'        => 'Boolean',
						'description' => __( 'Whether or not the Company Member is on the active roster.', 'callboard' ),
					],
				],
				'outputFields'        => [
					'newCompanyMemberID' => [
						'type'        => 'ID',
						'description' => __( 'The updated user ID.', 'callboard' ),
					],
				],
				'mutateAndGetPayload' => function ( $input ) {
					$result = wp_insert_user( [
						'role'       => 'company_member',
						'first_name' => sanitize_text_field( $input['firstName'] ),
						'last_name'  => sanitize_text_field( $input['lastName'] ),
						'user_login' => sanitize_email( $input['email'] ),
						'user_pass'  => wp_generate_password(),
						'user_email' => sanitize_email( $input['email'] ),
						'meta_input' => [
							'callboard-role'   => sanitize_text_field( $input['role'] ),
							'callboard-active' => boolval( $input['active'] ),
						],
					] );

					if ( is_wp_error( $result ) ) {
						throw new \GraphQL\Error\UserError( ! empty( $result->get_error_code() ) ? $result->get_error_code() : __( 'Error creating user', 'callboard' ) );
					}

					return [
						'newCompanyMemberID' => $result,
					];
				},
			]
		);
	}

	/**
	 * Set CORS to allow frontend logins
	 *
	 * @since 0.0.1
	 *
	 * @param  array $headers The HTTP headers present.
	 * @return array The modified headers.
	 */
	public function response_headers_to_send( $headers ) {
		$http_origin     = get_http_origin();
		$allowed_origins = [
			$this->frontend_url,
		];

		// If the request is coming from an allowed origin, tell the browser it can accept the response.
		if ( in_array( $http_origin, $allowed_origins, true ) ) {
			$headers['Access-Control-Allow-Origin'] = $http_origin;
		}

		// Tells browsers to expose the response to frontend JavaScript code when the request credentials mode is "include".
		$headers['Access-Control-Allow-Credentials'] = 'true';

		return $headers;
	}
}
