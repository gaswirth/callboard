<?php
/**
 * GraphQL.
 */

class Callboard_GraphQL extends Callboard {
	public function __construct() {
		add_action( 'graphql_register_types', [$this, 'register_types'] );
		add_filter( 'graphql_register_types', [$this, 'register_mutations'] );
		add_filter( 'graphql_post_object_connection_query_args', [$this, 'show_range_datetime_query_args'], 10, 5 );
	}

	/**
	 * Register GraphQL objects and fields.
	 *
	 * @return void
	 */
	public function register_types() {
		$cpt_graphql_single_name = 'Show';

		/**
		 * Create a `showsBefore` field on the RootQuery to return the start of a date range.
		 */
		register_graphql_field(
			'RootQueryTo' . $cpt_graphql_single_name . 'ConnectionWhereArgs',
			'showsBefore',
			[
				'type'        => 'String',
				'description' => 'The start of the showtime filter range (inclusive).',
			]
		);

		/**
		 * Create a `showsAFter` field on the RootQuery to return the end of a date range.
		 */
		register_graphql_field(
			'RootQueryTo' . $cpt_graphql_single_name . 'ConnectionWhereArgs',
			'showsAfter',
			[
				'type'        => 'String',
				'description' => 'The end of the showtime filter range (inclusive).',
			]
		);

		/**
		 * Create the `CompanyMember` object type.
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
						'type'        => 'String',
						'description' => 'The newly created Show ID',
					],
				],
				'mutateAndGetPayload' => function ( $input, $context, $info ) {
					$newShowId = null;

					$currentShowId    = get_option( 'current_show' );
					$currentShowTitle = absint( get_the_title( $currentShowId ) );
					$post_title       = $currentShowTitle + 1;

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

					return [
						'newShowId' => $newShowId,
					];
				},
			]
		);
	}

	/**
	 * The meta query for shows
	 *
	 * @param array       $query_args  The args that will be passed to the WP_Query
	 * @param mixed       $source The source that’s passed down the GraphQL queries
	 * @param array       $args The inputArgs on the field
	 * @param AppContext  $context The AppContext passed down the GraphQL tree
	 * @param ResolveInfo $info The ResolveInfo passed down the GraphQL tree
	 * @return array The filtered query args.
	 */
	public function show_range_datetime_query_args( $query_args, $source, $args, $context, $info ) {
		$before = isset( $args['where']['showsBefore'] ) ? $args['where']['showsBefore'] : false;
		$after  = isset( $args['where']['showsAfter'] ) ? $args['where']['showsAfter'] : false;

		// If a range has been set, alter the query filter
		// Using a 'before' and 'after' filter to include range endpoints.
		if ( $before && $after ) {
			$query_args['meta_query'] = [
				'relation' => 'AND',
				[
					'key'     => '_show_date',
					'value'   => $before,
					'compare' => '<=',
					'type'    => 'DATE',
				],
				[
					'key'     => '_show_date',
					'value'   => $after,
					'compare' => '>=',
					'type'    => 'DATE',
				],
			];
		}

		return $query_args;
	}

}

$graphql = new Callboard_GraphQL();
