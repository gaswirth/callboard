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
			'company_title',
			[
				'type'              => 'string',
				'sanitize_callback' => 'esc_textarea',
				'default'           => NULL,
				'show_in_graphql'   => true,
			]
		);
	}
}

$callboard = new Callboard();
