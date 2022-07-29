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
		add_action( 'init', array( $this, 'register_settings' ) );
	}

	/**
	 * Creates necessary user roles.
	 *
	 * @return void
	 */
	public function create_user_roles() {
		add_role( 'performer', 'Performer', get_role( 'contributor' )->capabilities );
	}

	/**
	 * Creates settings as global storage.
	 */
	public function register_settings() {
		register_setting(
			'callboard_options',
			'current_show',
			array(
				'type'              => 'integer',
				'sanitize_callback' => 'absint',
				'default'           => NULL,
				'show_in_graphql'   => true,
			)
		);
	}
}

$callboard = new Callboard();
