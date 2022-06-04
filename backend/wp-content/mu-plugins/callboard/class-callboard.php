<?php
/**
 * Callboard base class.
 */
class Callboard {
	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'create_user_roles' ) );
	}

	/**
	 * Creates necessary user roles.
	 *
	 * @return void
	 */
	public function create_user_roles() {
		add_role( 'performer', 'Performer', get_role( 'contributor' )->capabilities );
	}
}

$callboard = new Callboard();
