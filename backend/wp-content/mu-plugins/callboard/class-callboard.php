<?php
/**
 * Callboard base class.
 */
class Callboard {
	public function __construct() {
		add_action( 'init', array( $this, 'rename_user_roles' ) );
	}

	/**
	 * Rename user roles.
	 */
	public function rename_user_roles() {
		global $wp_roles;
		if ( ! isset( $wp_roles ) ) {
			$wp_roles = new WP_Roles();
		}

		$subscriber_name = 'Cast Member';
		$wp_roles->roles['subscriber']['name'] = $subscriber_name;
		$wp_roles->role_names['subscriber'] = $subscriber_name;
	}
}

$callboard = new Callboard();
