<?php
/**
 * Registration of user meta fields.
 *
 * @since 1.0.0
 * @package Callboard
 * @subpackage Callboard/includes
 */

/**
 * Sets up custom data for Users.
 *
 * @since 1.0.0
 * @package Callboard
 * @subpackage Callboard/includes
 */
class Callboard_Users {
	/**
	 * Create the custom Company Member role, cloning the `subscriber` role's capabilities.
	 *
	 * @since 1.0.0
	 */
	public static function add_company_member_role() {
		$subscriber = get_role( 'subscriber' );
		add_role( 'company_member', __( 'Company Member', 'callboard' ), $subscriber->capabilities );
	}

	/**
	 * Add new fields above 'Update' button.
	 *
	 * @since 1.0.0
	 * @param WP_User $user User object.
	 */
	public function callboard_user_fields( $user ) {
		$callboard_role = 'object' === gettype( $user ) ? get_the_author_meta( 'callboard-role', $user->ID ) : '';

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
			</table>',
			esc_html__( 'Callboard Data', 'callboard' ),
			esc_html__( 'Please do not edit this directly.', 'callboard' ),
			esc_html__( 'Role', 'callboard' ),
			esc_textarea( $callboard_role )
		);
	}

	/**
	 * Save additional profile fields.
	 *
	 * @since 1.0.0
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
	}
}
