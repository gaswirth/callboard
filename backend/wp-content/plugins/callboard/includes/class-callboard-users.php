<?php
/**
 * Registration of user meta fields.
 *
 * @package Callboard
 * @subpackage Callboard/includes
 *
 * @since 0.0.1
 */

/**
 * Sets up custom data for Users.
 *
 * @package Callboard
 * @subpackage Callboard/includes
 *
 * @since 0.0.1
 */
class Callboard_Users {
	/**
	 * Create the custom Company Member role, cloning the `subscriber` role's capabilities.
	 *
	 * @since 0.0.1
	 */
	public function add_company_member_role() {
		$subscriber = get_role( 'subscriber' );
		add_role( 'company_member', __( 'Company Member', 'callboard' ), $subscriber->capabilities );
	}

	/**
	 * Remove the Company Member role.
	 *
	 * @return void
	 */
	public static function remove_company_member_role() {
		remove_role( 'company_member' );
	}

	/**
	 * Runs get_users() to retrieve "active" Company Members.
	 *
	 * @return array A collection of users.
	 */
	public static function query_active_company_members() {
		return get_users(
			// phpcs:disable WordPress.DB.SlowDBQuery
			[
				'role__in'   => 'company_member',
				'meta_query' => [
					[
						'key'      => 'callboard-active',
						'value'    => 1,
						'compare'  => '=',
						'orderby'  => 'meta_value',
						'meta_key' => 'last_name',
					],
				],
			]
			// phpcs:enable WordPress.DB.SlowDBQuery
		);
	}

	/**
	 * Runs get_users() to retrieve "inactive" Company Members.
	 *
	 * @return array A collection of users.
	 */
	public static function query_inactive_company_members() {
		return get_users(
			// phpcs:disable WordPress.DB.SlowDBQuery
			[
				'role__in'   => 'company_member',
				'meta_query' => [
					[
						'key'      => 'callboard-active',
						'value'    => 1,
						'compare'  => '!=',
						'orderby'  => 'meta_value',
						'meta_key' => 'last_name',
					],
					'count_total' => false,
				],
			]
			// phpcs:enable WordPress.DB.SlowDBQuery
		);
	}

	/**
	 * Runs get_users() to retrieve a list of Company Members excluding a specific subset.
	 *
	 * @return array A collection of users.
	 */
	public static function query_company_members_excluding( $exclude ) {
		return get_users(
			[
				'role__in'    => 'company_member',
				'exclude'     => $exclude,
				'count_total' => false,
			],
		);
	}

	/**
	 * Generates the starting attendance array for new shows.
	 *
	 * @return array The starting array, with empty values keyed by user id.
	 */
	public static function generate_new_show_attendance() {
		$users = self::query_active_company_members();

		$attendance = [];

		foreach ( $users as $user ) {
			$attendance[$user->get( 'ID' )] = '';
		}

		return $attendance;
	}

	/**
	 * Add new fields above 'Update' button.
	 *
	 * @since 0.0.1
	 *
	 * @param  WP_User $user User object.
	 * @return void
	 */
	public function callboard_user_fields( $user ) {
		if ( ! $user instanceof WP_User ) {
			return;
		}

		$role   = get_the_author_meta( 'callboard-role', $user->ID );
		$active = get_the_author_meta( 'callboard-active', $user->ID );

		wp_nonce_field( 'custom_user_fields', 'custom_user_fields_nonce', false );

		printf(
			'<h3>%1$s</h3>
			<p><strong>%2$s</strong></p>
			<table class="form-table">
				<tr>
					<th><label for="callboard-role">%3$s</label></th>
					<td>
						<input type="text" id="callboard-role" name="callboard-role" value="%4$s" />
					</td>
				</tr>
				<tr>
					<th><label for="callboard-active">%5$s</label></th>
					<td>
						<input type="checkbox" id="callboard-active" name="callboard-active" value=1 %6$s />
					</td>
				</tr>
			</table>',
			esc_html__( 'Callboard Data', 'callboard' ),
			esc_html__( 'Please do not edit this directly.', 'callboard' ),
			esc_html__( 'Role', 'callboard' ),
			esc_textarea( $role ),
			esc_html__( 'Active', 'callboard' ),
			checked( $active, true, false )
		);
	}

	/**
	 * Save additional profile fields.
	 *
	 * @since 0.0.1
	 *
	 * @param int $user_id Current user ID.
	 */
	public function save_callboard_user_fields( $user_id ) {
		if ( ! current_user_can( 'edit_user', $user_id ) || ! isset( $_POST['custom_user_fields_nonce'] ) || ! wp_verify_nonce( $_POST['custom_user_fields_nonce'], 'custom_user_fields' ) ) {
			return false;
		}

		if ( isset( $_POST['callboard-role'] ) ) {
			if ( empty( $_POST['callboard-role'] ) ) {
				delete_user_meta( $user_id, 'callboard-role' );
			}

			update_user_meta( $user_id, 'callboard-role', wp_strip_all_tags( wp_unslash( $_POST['callboard-role'] ) ) );
		}

		if ( ! isset( $_POST['callboard-active'] ) ) {
			delete_user_meta( $user_id, 'callboard-active' );
		} else {
			update_user_meta( $user_id, 'callboard-active', wp_strip_all_tags( wp_unslash( $_POST['callboard-active'] ) ) );
		}
	}

	/**
	 * Prepares a Company Member for sending to the frontend.
	 *
	 * @param  WP_User $user The user.
	 * @return array   The Company Member data.
	 */
	public static function prepare_company_member_for_frontend( $user ) {
		$user_id  = $user->get( 'ID' );
		$usermeta = get_user_meta( $user->ID );

		$first_name = isset( $usermeta['first_name'] ) ? $usermeta['first_name'][0] : '';
		$last_name  = isset( $usermeta['last_name'] ) ? $usermeta['last_name'][0] : '';
		$role       = isset( $usermeta['callboard-role'] ) ? $usermeta['callboard-role'][0] : '';
		$active     = isset( $usermeta['callboard-active'] ) ? $usermeta['callboard-active'][0] : null;

		return [
			'id'        => $user_id,
			'firstName' => $first_name,
			'lastName'  => $last_name,
			'email'     => $user->get( 'user_email' ),
			'role'      => $role,
			'active'    => $active,
		];
	}
}
