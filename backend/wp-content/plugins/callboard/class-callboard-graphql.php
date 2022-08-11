<?php
/**
 * GraphQL.
 *
 * @package Callboard
 */

/**
 * Callboard_GraphQL class.
 */
class Callboard_GraphQL extends Callboard {
	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'graphql_register_types', [$this, 'register_types'] );
		add_filter( 'graphql_register_types', [$this, 'register_mutations'] );
		add_filter( 'graphql_response_headers_to_send', [$this, 'response_headers_to_send'] );
	}

	/**
	 * Register GraphQL objects and fields.
	 *
	 * @return void
	 */
	public function register_types() {
		/**
		 * Create the `CompanyMember` object type for handling Users.
		 */
		register_graphql_object_type(
			'CompanyMember',
			[
				'description' => __( 'Company Member', 'callboard' ),
				'fields'      => [
					'companyMemberId' => [
						'type'        => 'String',
						'description' => __( 'User ID', 'callboard' ),
					],
					'name'            => [
						'type'        => 'String',
						'description' => __( 'Name', 'callboard' ),
					],
					'role'            => [
						'type'        => 'String',
						'description' => __( 'The public role to display on the frontend.', 'callboard' ),
					],
				],
			]
		);

		/**
		 * Registers the `show` custom fields.
		 */
		register_graphql_fields(
			'Show',
			[
				'datetime'   => [
					'type'        => 'String',
					'description' => __( 'The show date and time.', 'callboard' ),
					'resolve'     => function ( $show ) {
						$datetime = get_post_meta( $show->ID, 'datetime', true );

						return esc_textarea( $datetime );
					},
				],
				'attendance' => [
					'type'        => 'String',
					'description' => __( 'The serialized array of companyMemberIds and their respective attendance statuses.', 'callboard' ),
					'resolve'     => function ( $show ) {
						$attendance = maybe_unserialize( get_post_meta( $show->ID, 'attendance', true ) );

						return wp_json_encode( $attendance );
					},
				],
			]
		);

		/**
		 * Create the `companyMembers` field on the RootQuery to return a list of users with the 'company_member' user role.
		 */
		register_graphql_field(
			'RootQuery',
			'companyMembers',
			[
				'type'        => ['list_of' => 'CompanyMember'],
				'description' => __( 'The public "role" to display on the frontend.', 'callboard' ),
				'resolve'     => function () {
					$users = get_users(
						[
							'role__in' => 'company_member',
						]
					);

					$company_members = [];
					foreach ( $users as $user ) {
						$company_members[] = [
							'companyMemberId' => $user->ID,
							'name'            => sprintf( '%1$s %2$s', $user->first_name, $user->last_name ),
							'role'            => get_user_meta( $user->ID, 'callboard-role', true ),
						];
					}

					return $company_members;
				},
			],
		);
	}

	/**
	 * Register GraphQL mutations.
	 *
	 * @return void
	 */
	public function register_mutations() {
		/**
		 * Login mutation (HTTP Cookies).
		 */
		register_graphql_mutation(
			'loginWithCookies',
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
						throw new \GraphQL\Error\UserError( ! empty( $user->get_error_code() ) ? $user->get_error_code() : 'invalid login' );
					}

					return [
						'status' => 'SUCCESS',
						'userId' => $user->ID,
						'roles'  => implode( ',', $user->roles ),
					];
				},
			]
		);

		/**
		 * Logout mutation.
		 */
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

		/**
		 * Create a new show, and update the `current_show` setting.
		 */
		register_graphql_mutation(
			'newShow',
			[
				'inputFields'         => [
					'description' => __( 'New Show data.', 'callboard' ),
					'datetime'    => [
						'type'        => 'String',
						'description' => __( 'Date and time string', 'callboard' ),
					],
				],
				'outputFields'        => [
					'newShowId' => [
						'type'        => 'ID',
						'description' => __( 'The newly created Show ID', 'callboard' ),
					],
				],
				'mutateAndGetPayload' => function ( $input ) {
					$new_show_id = null;

					$last_show = get_posts(
						[
							'post_type'      => 'show',
							'posts_per_page' => 1,
							'post_status'    => 'publish',
						]
					);

					/**
					 * Increment the show count (title)
					 */
					// TODO `show_number` field that can be autofilled with this value, and also changed? Or just do this with `post_title` even?
					$post_title = absint( $last_show[0]->post_title ) + 1;

					$new_show_id = wp_insert_post(
						[
							'post_type'   => 'show',
							'post_status' => 'publish',
							'post_title'  => $post_title,
							'meta_input'  => [
								'datetime' => Callboard_Functions::format_date_string( $input['datetime'] ),
							],
						]
					);

					return [
						'newShowId' => $new_show_id,
					];
				},
			]
		);

		/**
		 * Update a show's attendance status array.
		 */
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
				'mutateAndGetPayload' => function ( $input, $context, $info ) {
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
	 * Set CORS to allow frontend logins
	 *
	 * @param  array $headers The HTTP headers present.
	 * @return array The modified headers.
	 */
	public function response_headers_to_send( $headers ) {
		$http_origin     = get_http_origin();
		$allowed_origins = [
			self::HEADLESS_FRONTEND_URL,
		];

		// If the request is coming from an allowed origin (HEADLESS_FRONTEND_URL), tell the browser it can accept the response.
		if ( in_array( $http_origin, $allowed_origins, true ) ) {
			$headers['Access-Control-Allow-Origin'] = $http_origin;
		}

		// Tells browsers to expose the response to frontend JavaScript code when the request credentials mode is "include".
		$headers['Access-Control-Allow-Credentials'] = 'true';

		return $headers;
	}
}

$graphql = new Callboard_GraphQL();
