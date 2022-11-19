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
		 * Register settings.
		 *
		 * @return void
		 */
		public function register_settings() {
			register_setting(
				$this->plugin_name,
				'callboard_frontend_url',
				[
					'type'              => 'string',
					'description'       => 'The app\'s frontend url.',
					'sanitize_callback' => 'esc_url_raw',
					'show_in_rest'      => true,
					'show_in_graphql'   => true,
				]
			);

			register_setting(
				$this->plugin_name,
				'callboard_company_name',
				[
					'type'              => 'string',
					'description'       => 'The app\'s frontend url.',
					'sanitize_callback' => 'sanitize_text_field',
					'show_in_rest'      => true,
					'show_in_graphql'   => true,
				]
			);
		}

		/**
		 * Initialize plugin settings sections and fields.
		 *
		 * @return void
		 */
		public function settings_fields_admin_init() {
			/**
			 * Register settings sections.
			 */
			add_settings_section(
				$this->option_group,
				sprintf( __( '%s Settings', 'callboard' ), $this->plugin_title ),
				[$this, 'settings_fields_admin_init_cb'],
				$this->plugin_name,
			);

			/**
			 * Register input fields.
			 */
			add_settings_field(
				'callboard_frontend_url',
				__( 'Callboard Frontend URL' ),
				[$this, 'callboard_frontend_url_cb'],
				$this->plugin_name,
				$this->option_group,
				[
					'label_for' => 'callboard_frontend_url',
				]
			);

			add_settings_field(
				'callboard_company_name',
				__( 'Company Name' ),
				[$this, 'callboard_company_name_cb'],
				$this->plugin_name,
				$this->option_group,
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

			<input name="<?php echo $args['label_for']; ?>" id="<?php echo $args['label_for']; ?>" type="text" value="<?php echo esc_url( $value ); ?>" />

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

			<input name="<?php echo $args['label_for']; ?>" id="<?php echo $args['label_for']; ?>" type="text" value="<?php echo esc_textarea( $value ); ?>" />

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
							$this->plugin_name,
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
					// output security fields for the registered setting "callboard"
							settings_fields( $this->plugin_name );
							// output setting sections and their fields
							// (sections are registered for "callboard", each field is registered to a specific section)
							do_settings_sections( $this->plugin_name );
							// output save settings button
							submit_button( 'Save Settings' );
						?>
			</form>
		</div>
		<?php
			}

		}
