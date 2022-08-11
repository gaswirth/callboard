<?php
/**
 * Registers all plugin settings.
 *
 * @package Callboard
 * @subpackage Callboard/includes
 * @since 1.0.0
 */

/**
 * Handles all global plugin settings and options.
 *
 * @package Callboard
 * @subpackage Callboard/includes
 * @since 1.0.0
 */
class Callboard_Settings {
	/**
	 * The ID of this plugin.
	 *
	 * @since 1.0.0
	 * @access private
	 * @var    string
	 */
	private $plugin_name;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since 1.0.0
	 * @param string $plugin_name The name of the plugin.
	 */
	public function __construct( $plugin_name ) {
		$this->plugin_name = $plugin_name;
	}

	/**
	 * Register settings fields.
	 *
	 * @since 1.0.0
	 */
	public function register_settings_fields() {
		register_setting(
			$this->plugin_name . '_options',
			'company_name',
			[
				'type'              => 'string',
				'sanitize_callback' => 'esc_textarea',
				'default'           => null,
				'show_in_graphql'   => true,
			]
		);
	}
}
