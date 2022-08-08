<?php
/**
 * GraphQL.
 */

class Callboard_GraphQL extends Callboard {
	public function __construct() {
		add_action( 'graphql_register_types', [$this, 'register_types'] );
		add_filter( 'graphql_register_types', [$this, 'register_mutations'] );
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
				'description' => 'Company Member',
				'fields'      => [
					'companyMemberId' => [
						'type'        => 'String',
						'description' => 'User ID',
					],
					'name'            => [
						'type'        => 'String',
						'description' => 'Name',
					],
					'callboardRole'   => [
						'type'        => 'String',
						'description' => 'The public role to display on the frontend.',
					],
				],
			] );

		/**
		 * Registers the `show` custom fields.
		 */
		register_graphql_fields( 'Show', [
			'datetime'   => [
				'type'        => 'String',
				'description' => 'The show date and time.',
				'resolve'     => function ( $show ) {
					$datetime = get_post_meta( $show->ID, 'datetime', true );

					return esc_textarea( $datetime );
				},
			],
			'attendance' => [
				'type'        => 'String',
				'description' => 'The serialized array of companyMemberIds and their respective attendance statuses.',
				'resolve'     => function ( $show ) {
					$attendance = maybe_unserialize( get_post_meta( $show->ID, 'attendance', true ) );

					return json_encode( $attendance );
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
				'description' => 'The public "role" to display on the frontend.',
				'resolve'     => function () {
					$users = get_users( [
						'role__in' => 'company_member',
					] );

					$company_members = [];
					foreach ( $users as $user ) {
						$company_members[] = [
							'companyMemberId' => $user->ID,
							'name'            => sprintf( '%1$s %2$s', $user->first_name, $user->last_name ),
							'callboardRole'   => get_user_meta( $user->ID, 'callboard-role', true ),
						];
					}

					return $company_members;
				},
			] );
	}

	public function register_mutations() {
		/**
		 * Create a new show, and update the `current_show` setting.
		 */
		register_graphql_mutation(
			'createNewShow',
			[
				'inputFields'         => [
					'description' => 'New Show data.',
					'datetime'    => [
						'type'        => 'String',
						'description' => 'Date and time string',
					],
				],
				'outputFields'        => [
					'newShowId' => [
						'type'        => 'ID',
						'description' => 'The newly created Show ID',
					],
				],
				'mutateAndGetPayload' => function ( $input, $context, $info ) {
					$newShowId = null;

					$last_show = get_posts( [
						'post_type'      => 'show',
						'posts_per_page' => 1,
						'post_status'    => 'publish',
					] );

					/**
					 * Increment the show count (title)
					 */
					// TODO `show_number` field that can be autofilled with this value, and also changed? Or just do this with `post_title` even?
					$post_title = absint( $last_show[0]->post_title ) + 1;

					$newShowId = wp_insert_post(
						[
							'post_type'   => 'show',
							'post_status' => 'publish',
							'post_title'  => $post_title,
							'meta_input'  => [
								'datetime' => $input['datetime'],
							],
						]
					);

					if ( ! is_wp_error( $newShowId ) && $newShowId ) {
						update_option( 'current_show', $newShowId );
					}

					return [
						'newShowId' => $newShowId,
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
						'description' => 'The show databaseId',
					],
					'companyMemberId' => [
						'type'        => 'ID',
						'description' => 'The user databaseId',
					],
					'status'          => [
						'type'        => 'String',
						'description' => 'The vacation status. One of: in, out, vac, pd.',
					],
				],
				'outputFields'        => [
					'newStatus' => [
						'type'        => 'String',
						'description' => 'The updated status.',
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
}

$graphql = new Callboard_GraphQL();
