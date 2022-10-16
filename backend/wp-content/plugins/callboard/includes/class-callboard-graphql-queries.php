<?php
/**
 * GraphQL queries.
 *
 * @package Callboard
 * @subpackage Callboard/includes
 *
 * @since 0.0.1
 */

/**
 * Callboard_GraphQL_Queries class.
 *
 * @package Callboard
 * @subpackage Callboard/includes
 *
 * @since 0.0.1
 */
class Callboard_GraphQL_Queries extends Callboard_GraphQL {
	/**
	 * Register GraphQL objects and fields.
	 *
	 * @since 0.0.1
	 */
	public function register_types() {
		$this->register_company_member_object_type();
		$this->register_active_company_members_field();
		$this->register_company_members_excluding_field();
		$this->register_company_members_field();
		$this->register_show_fields();
	}

	/**
	 * Register the `companyMembers` field on the RootQuery to return a list of users with the 'company_member' user role.
	 *
	 * @since 0.0.1
	 *
	 * @return void
	 */
	public function register_company_members_field() {
		register_graphql_field(
			'RootQuery',
			'companyMembers',
			[
				'type'        => ['list_of' => 'CompanyMember'],
				'description' => __('The public "role" to display on the frontend.', 'callboard'),
				'args'        => [
					'ids' => [
						'type' => ['list_of' => 'ID'],
					],
				],
				'resolve'     => function ($source, $args) {
					$query_args = [
						'role__in' => 'company_member',
						'orderby'  => 'meta_value',
						// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
						'meta_key' => 'last_name',
					];

					if (isset($args['ids'])) {
						$query_args['include'] = $args['ids'];
					}

					$users = get_users($query_args);

					$company_members = [];
					foreach ($users as $user) {
						$user_id    = $user->get('ID');
						$first_name = get_user_meta($user_id, 'first_name', true);
						$last_name  = get_user_meta($user_id, 'last_name', true);

						$company_members[] = [
							'id'        => $user_id,
							'firstName' => $first_name,
							'lastName'  => $last_name,
							'email'     => $user->get('user_email'),
							'role'      => get_user_meta($user_id, 'callboard-role', true),
							'active'    => get_user_meta($user_id, 'callboard-active', true),
						];
					}

					return $company_members;
				},
			],
		);
	}

	/**
	 * Register the `activeCompanyMembers` field on the RootQuery to return a list of users on the active roster.
	 *
	 * @return void
	 */
	public function register_active_company_members_field() {
		register_graphql_field(
			'RootQuery',
			'activeCompanyMembers',
			[
				'type'        => ['list_of' => 'CompanyMember'],
				'description' => __('Company Members on the active roster.', 'callboard'),
				'resolve'     => function () {
					$users = Callboard_Users::query_active_company_members();

					$company_members = [];
					foreach ($users as $user) {
						$company_members[] = Callboard_Users::prepare_company_member_for_frontend($user);
					}

					return $company_members;
				},
			],
		);
	}

	/**
	 * Register the `inactiveCompanyMembers` field on the RootQuery to return a list of users on the active roster.
	 *
	 * @return void
	 *
	 * // MAYBE Determine need for this query.
	 */
	public function register_inactive_company_members_field() {
		register_graphql_field(
			'RootQuery',
			'inactiveCompanyMembers',
			[
				'type'        => ['list_of' => 'CompanyMember'],
				'description' => __('Company Members on the inactive roster.', 'callboard'),
				'resolve'     => function () {
					$users = Callboard_Users::query_inactive_company_members();

					$company_members = [];
					foreach ($users as $user) {
						$company_members[] = Callboard_Users::prepare_company_member_for_frontend($user);
					}

					return $company_members;
				},
			],
		);
	}

	/**
	 * Retrieves a collecton of Company Members excluding a specific subset.
	 *
	 * @return void
	 */
	public function register_company_members_excluding_field() {
		register_graphql_field(
			'RootQuery',
			'companyMembersExcluding',
			[
				'type'        => ['list_of' => 'CompanyMember'],
				'description' => __('Company Members on the inactive roster.', 'callboard'),
				'args'        => [
					'excludes' => [
						'type' => ['list_of' => 'ID'],
					],
				],
				'resolve'     => function ($source, $args) {
					if (!isset($args['excludes'])) {
						return false;
					}

					$users = Callboard_Users::query_company_members_excluding($args['excludes']);

					$company_members = [];
					foreach ($users as $user) {
						$company_members[] = Callboard_Users::prepare_company_member_for_frontend($user);
					}

					return $company_members;
				},
			],
		);
	}

	/**
	 * Create the `CompanyMember` object type for handling Users.
	 *
	 * @since 0.0.1
	 *
	 * @return void
	 */
	public function register_company_member_object_type() {
		register_graphql_object_type(
			'CompanyMember',
			[
				'description' => __('Company Member', 'callboard'),
				'fields'      => [
					'id'        => [
						'type'        => 'ID',
						'description' => __('User ID', 'callboard'),
					],
					'firstName' => [
						'type'        => 'String',
						'description' => __('First name', 'callboard'),
					],
					'lastName'  => [
						'type'        => 'String',
						'description' => __('Last name', 'callboard'),
					],
					'email'     => [
						'type'        => 'String',
						'description' => __('Email address', 'callboard'),
					],
					'role'      => [
						'type'        => 'String',
						'description' => __('The public role to display on the frontend.', 'callboard'),
					],
					'active'    => [
						'type'        => 'Boolean',
						'description' => __('Whether or not the Company Member is on the active roster.', 'callboard'),
					],
				],
			]
		);
	}

	/**
	 * Registers the `show` custom fields.
	 *
	 * @since 0.0.1
	 *
	 * @return void
	 */
	public function register_show_fields() {
		register_graphql_fields(
			'Show',
			[
				'datetime'   => [
					'type'        => 'String',
					'description' => __('The show date and time.', 'callboard'),
					'resolve'     => function ($show) {
						$datetime = get_post_meta($show->ID, 'datetime', true);

						return esc_textarea($datetime);
					},
				],
				'notes'      => [
					'type'        => 'String',
					'description' => __('Show notes.', 'callboard'),
					'resolve'     => function ($show) {
						$notes = get_post_meta($show->ID, 'notes', true);

						return sanitize_textarea_field($notes);
					},
				],
				'attendance' => [
					'type'        => 'String',
					'description' => __('The serialized array of IDs and their respective attendance statuses.', 'callboard'),
					'resolve'     => function ($show) {
						$attendance = maybe_unserialize(get_post_meta($show->ID, 'attendance', true));

						return wp_json_encode($attendance);
					},
				],
			]
		);
	}
}
