<?php
/**
 * Registers all plugin settings.
 *
 * @package Callboard
 * @subpackage Callboard/includes
 *
 * @since 0.0.2
 */

/**
 * Handles all global plugin settings and options.
 *
 * @package Callboard
 * @subpackage Callboard/includes
 *
 * @since 0.0.2
 */
class Callboard_Settings {
	/**
	 * The main plugin option group.
	 *
	 * @access private
	 * @var string
	 * @since 0.0.2
	 */
	private $option_group;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since 0.0.2
	 *
	 * @param string $plugin_name The name of the plugin.
	 */
	public function __construct( $plugin_name ) {
		$this->option_group = $plugin_name . '_options';
	}

	/**
	 * Register a settings field.
	 *
	 * @param string $key               The setting key.
	 * @param string $type              The data type.
	 * @param string $sanitize_callback A sanitize function to run on the input value.
	 * @param string $default           The default field value. Defaults to ''.
	 */
	public function register_field( $key, $type, $sanitize_callback, $default = '' ) {
		register_setting(
			$this->option_group,
			$key,
			[
				'type'              => $type,
				'sanitize_callback' => $sanitize_callback,
				'default'           => $default,
				'show_in_graphql'   => true,
			]
		);
	}

	/**
	 * Register settings fields.
	 *
	 * @since 0.0.2
	 */
	public function register_settings_fields() {
		/**
		 * Frontend URL.
		 */
		$this->register_field( 'callboard_frontend_url', 'string', 'esc_url' );

		/**
		 * Company Name.
		 */
		$this->register_field( 'callboard_company_name', 'string', 'esc_textarea' );
	}
}
