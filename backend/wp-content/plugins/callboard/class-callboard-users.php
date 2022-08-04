<?php
/**
 * Registration of user meta fields.
 */

class Callboard_Users extends Callboard {
	public function __construct() {
		register_activation_hook( CALLBOARD_CORE, [ $this, 'add_company_member_role' ] );

		add_action( 'user_new_form', [ $this, 'callboard_user_fields' ] );
		add_action( 'show_user_profile', [ $this, 'callboard_user_fields' ] );
		add_action( 'edit_user_profile', [ $this, 'callboard_user_fields' ] );
		add_action( 'user_register', [ $this, 'save_callboard_user_fields' ] );
		add_action( 'personal_options_update', [ $this, 'save_callboard_user_fields' ] );
		add_action( 'edit_user_profile_update', [ $this, 'save_callboard_user_fields' ] );
	}

	/**
	 * Create the custom Company Member role, cloning the `subscriber` role's capabilities.
	 */
	public function add_company_member_role() {
		$subscriber = get_role( 'subscriber' );
		add_role( 'company_member', __( 'Company Member', 'callboard' ), $subscriber->capabilities );
	}

	/**
	 * Add new fields above 'Update' button.
	 *
	 * @param WP_User $user User object.
	 */
	public function callboard_user_fields( $user ) {
		$callboard_role = 'object' === gettype( $user ) ? get_the_author_meta( 'callboard-role', $user->ID ) : '';
		?>
		<h3><?php esc_html_e( 'Callboard Data', 'callboard' );?></h3>
		<p><strong><?php esc_html_e( 'Please do not edit this directly.', 'callboard' );?></strong></p>

		<table class="form-table">
			<tr>
				<th><label for="callboard-role"><?php esc_html_e( 'Role', 'callboard' );?></label></th>
				<td>
					<input type="text" id="callboard-role" name="callboard-role" value="<?php echo esc_textarea( $callboard_role ); ?>" />
				</td>
			</tr>
		</table>
		<?php
	}

	/**
	 * Save additional profile fields.
	 *
	 * @param  int $user_id Current user ID.
	 */
	public function save_callboard_user_fields( $user_id ) {
		if ( ! current_user_can( 'edit_user', $user_id ) ) {
			return false;
		}

		if ( empty( $_POST['callboard-role'] ) ) {
			delete_user_meta( $user_id, 'callboard-role', $_POST['callboard-role'] );
		}

		update_user_meta( $user_id, 'callboard-role', $_POST['callboard-role'] );
	}
}

$graphql = new Callboard_Users();
