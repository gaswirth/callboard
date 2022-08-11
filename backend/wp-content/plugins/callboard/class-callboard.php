<?php
/**
 * Callboard base class.
 *
 * @package Callboard
 * @subpackage Callboard/includes
 */

/**
 * Main plugin class.
 *
 * @since 1.0.0
 * @package Callboard
 * @subpackage Callboard/includes
 */
class Callboard {
	/**
	 * The loader that handles maintaining and registering all hooks.
	 *
	 * @since 1.0.0
	 * @access protected
	 * @var Callboard_Loader
	 */
	protected $loader;

	/**
	 * The plugin name.
	 *
	 * @since 1.0.0
	 * @access protected
	 * @var string
	 */
	protected $plugin_name;

	/**
	 * The plugin version.
	 *
	 * @since 1.0.0
	 * @access protected
	 * @var string
	 */
	protected $version;

	/**
	 * The headless frontend URL.
	 *
	 * @since 1.0.0
	 * @var string
	 */
	public const FRONTEND_URL = 'http://localhost'; // TODO set this in options somewhere.

	/**
	 * The datetime string format for use in sending to the backend.
	 *
	 * @since 1.0.0
	 * @var string
	 */
	public const DATETIME_FORMAT = 'm/d/Y h:i A';

	/**
	 * Constructor.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		$this->plugin_name = 'callboard';

		if ( defined( 'CALLBOARD_VERSION' ) ) {
			$this->version = CALLBOARD_VERSION;
		} else {
			$this->version = '1.0.0';
		}

		$this->load_dependencies();
		$this->register_settings();
		$this->register_user_hooks();
		$this->register_show_hooks();
		$this->register_graphql_hooks();
	}

	/**
	 * Load plugin dependencies.
	 *
	 * @since 1.0.0
	 */
	public function load_dependencies() {
		require_once CALLBOARD_PLUGIN_PATH . 'class-callboard-loader.php';
		require_once CALLBOARD_PLUGIN_PATH . 'class-callboard-settings.php';
		require_once CALLBOARD_PLUGIN_PATH . 'class-callboard-show.php';
		require_once CALLBOARD_PLUGIN_PATH . 'class-callboard-users.php';
		require_once CALLBOARD_PLUGIN_PATH . 'class-callboard-functions.php';
		require_once CALLBOARD_PLUGIN_PATH . 'class-callboard-graphql.php';

		$this->loader = new Callboard_Loader();
	}

	/**
	 * Register actions and filters.
	 *
	 * @since 1.0.0
	 */
	public function register_settings() {
		$callboard_settings = new Callboard_Settings( $this->plugin_name );

		$this->loader->add_filter( 'init', $callboard_settings, 'register_settings_fields' );
	}

	/**
	 * Initialize User hooks.
	 *
	 * @since 1.0.0
	 */
	public function register_user_hooks() {
		$users = new Callboard_Users( $this->plugin_name );

		$this->loader->add_action( 'user_new_form', $users, 'callboard_user_fields' );
		$this->loader->add_action( 'user_new_form', $users, 'callboard_user_fields' );
		$this->loader->add_action( 'show_user_profile', $users, 'callboard_user_fields' );
		$this->loader->add_action( 'edit_user_profile', $users, 'callboard_user_fields' );
		$this->loader->add_action( 'user_register', $users, 'save_callboard_user_fields' );
		$this->loader->add_action( 'personal_options_update', $users, 'save_callboard_user_fields' );
		$this->loader->add_action( 'edit_user_profile_update', $users, 'save_callboard_user_fields' );
	}

	/**
	 * Initialize the `show` custom post type and related meta fields.
	 *
	 * @since 1.0.0
	 */
	public function register_show_hooks() {
		$show = new Callboard_Show();

		$this->loader->add_action( 'init', $show, 'register_cpt_show' );
		$this->loader->add_action( 'save_post', $show, 'save_show_meta', 10, 1 );
	}

	/**
	 * Initialize GraphQL hooks.
	 *
	 * @since 1.0.0
	 */
	public function register_graphql_hooks() {
		$hooks = new Callboard_GraphQL( self::FRONTEND_URL );

		$this->loader->add_action( 'graphql_register_types', $hooks, 'register_types' );
		$this->loader->add_filter( 'graphql_register_types', $hooks, 'register_mutations' );
		$this->loader->add_filter( 'graphql_response_headers_to_send', $hooks, 'response_headers_to_send' );
	}

	/**
	 * Run the loader to execute all WordPress hooks.
	 *
	 * @since 1.0.0
	 */
	public function run() {
		$this->loader->run();
	}
}

$callboard = new Callboard();
