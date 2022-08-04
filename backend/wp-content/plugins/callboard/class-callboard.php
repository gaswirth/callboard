<?php
/**
 * Callboard base class.
 */
class Callboard {
	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'init', [$this, 'register_settings'] );
	}

	/**
	 * Creates settings as global storage.
	 */
	public function register_settings() {
		register_setting(
			'callboard_options',
			'current_show',
			[
				'type'              => 'integer',
				'sanitize_callback' => 'absint',
				'default'           => NULL,
				'show_in_graphql'   => true,
			]
		);
	}

}

$callboard = new Callboard();
