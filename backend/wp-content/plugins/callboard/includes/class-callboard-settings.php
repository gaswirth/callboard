<?php
	/**
	 * Registers all plugin settings.
	 *
	 * @package Callboard
	 * @subpackage Callboard/includes
	 *
	 * @since 0.0.1
	 */

	// TODO Add settings page.

	/**
	 * Handles all global plugin settings and options.
	 *
	 * @package Callboard
	 * @subpackage Callboard/includes
	 *
	 * @since 0.0.1
	 */
	class Callboard_Settings {
		/**
		 * The plugin name.
		 *
		 * @access private
		 * @var string
		 * @since 0.0.1
		 */
		private $plugin_name;

		/**
		 * The main plugin option group.
		 *
		 * @access private
		 * @var string
		 * @since 0.0.1
		 */
		private $option_group;

		/**
		 * The plugin title.
		 *
		 * @access private
		 * @var string
		 * @since 0.0.1
		 */
		private $plugin_title;

		/**
		 * Initialize the class and set its properties.
		 *
		 * @since 0.0.1
		 *
		 * @param string $plugin_name The name of the plugin.
		 */
		public function __construct( $plugin_name, $plugin_title ) {
			$this->plugin_name  = $plugin_name;
			$this->plugin_title = $plugin_title;
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
		 * @since 0.0.1
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

		/**
		 * Initialize plugin settings sections and fields.
		 *
		 * @return void
		 */
		public function settings_fields_admin_init() {
			add_settings_section(
				$this->option_group . '_fields',
				sprintf( __( '%s Settings', 'callboard' ), $this->plugin_title ),
				[$this, 'settings_fields_admin_init_cb'],
				$this->plugin_name,
			);

			add_settings_field(
				'callboard_frontend_url',
				__( 'Callboard Frontend URL' ),
				[$this, 'callboard_frontend_url_cb'],
				$this->plugin_name,
				$this->option_group . '_fields',
				[
					'label_for' => 'callboard_frontend_url',
				]
			);

			add_settings_field(
				'callboard_company_name',
				__( 'Company Name' ),
				[$this, 'callboard_company_name_cb'],
				$this->plugin_name,
				$this->option_group . '_fields',
				[
					'label_for' => 'callboard_company_name',
				]
			);
		}

		/**
		 * Settings section callback function.
		 *
		 * @param array $args The settings array, defining title, id, callback.
		 */
		public function settings_fields_admin_init_cb( $args ) {
			printf( '<p id="%1$s">%2$s</p>', esc_attr( $args['id'] ), esc_html( 'Global settings.', 'callboard' ) );
		}

		/**
		 * Print the input for callboard_frontend_url.
		 *
		 * @param array $args
		 */
		public function callboard_frontend_url_cb( $args ) {
			$value = get_option( 'callboard_frontend_url' );
			?>

			<input name="<?php $args['label_for']; ?>" type="text" value="<?php echo esc_url( $value ); ?>"

			<?php
		}

		/**
		 * Print the input for callboard_frontend_url.
		 *
		 * @param array $args
		 */
		public function callboard_company_name_cb( $args ) {
			$value = get_option( 'callboard_company_name' );
			?>

			<input name="<?php $args['label_for']; ?>" type="text" value="<?php echo esc_url( $value ); ?>"

			<?php
		}

	/**
	 * Add the top level menu page.
	 */
	public function callboard_options_page() {
		add_menu_page(
			$this->plugin_title . ' Settings',
			$this->plugin_title,
			'manage_options',
			'callboard',
			[$this, 'callboard_options_page_html']
		);
	}

	/**
	 * Top level menu callback function
	 */
	function callboard_options_page_html() {
		// check user capabilities
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		// add error/update messages

		// check if the user have submitted the settings
		// WordPress will add the "settings-updated" $_GET parameter to the url
		if ( isset( $_GET['settings-updated'] ) ) {
			// add settings saved message with the class of "updated"
			add_settings_error( 'callboard_messages', 'callboard_message', __( 'Settings Saved', 'callboard' ), 'updated' );
		}

		// show error/update messages
		settings_errors( 'callboard_messages' );
		?>
		<div class="wrap">
			<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
			<form action="options.php" method="post">
				<?php
				// output security fields for the registered setting "wporg"
				settings_fields( $this->plugin_name );
				// output setting sections and their fields
				// (sections are registered for "wporg", each field is registered to a specific section)
				do_settings_sections( $this->plugin_name );
				// output save settings button
				submit_button( 'Save Settings' );
				?>
			</form>
		</div>
		<?php
	}

}
