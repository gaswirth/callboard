<?php
/**
 * Plugin Name: Callboard Required Plugins
 * Author: Nick Gaswirth
 * Author URI: https://roundhouse-designs.com
 * Description: Enforces required plugins using TGM Plugin Activation.
 *
 * @package callboard
 */

/**
 * Load the Callboard core plugin.
 */
try {
	callboard_load_core();
} catch ( Exception $e ) {
	// phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
	error_log( 'Callboard Fatal exception: ' . $e->getMessage() );
	return;
}

/**
 * Check for the Callboard core plugin, and load.
 *
 * @throws Exception If the core plugin is not found.
 * @return void
 */
function callboard_load_core() {
	$core = WPMU_PLUGIN_DIR . '/callboard/callboard.php';

	if ( ! file_exists( $core ) ) {
		throw new Exception( 'Callboard core plugin not found.' );
	}

	require_once $core;
}

/**
 * TGM Plugin Activation.
 */
require_once WP_CONTENT_DIR . '/class-tgm-plugin-activation.php';

/**
 * Required plugin registration.
 *
 * @return void
 */
function callboard_register_required_plugins() {
	/*
	 * Array of plugin arrays. Required keys are name and slug.
	 * If the source is NOT from the .org repo, then source is also required.
	 */
	$plugins = array(
		array(
			'name'               => 'Advanced Custom Fields PRO',
			'slug'               => 'advanced-custom-fields-pro',
			'force_activation'   => true,
			'force_deactivation' => false,
			'required'           => true,
			'source'             => WP_CONTENT_DIR . '/callboard-lib/plugins/advanced-custom-fields-pro.zip',
		),

		array(
			'name'               => 'Custom Post Type UI',
			'slug'               => 'custom-post-type-ui',
			'force_activation'   => true,
			'force_deactivation' => false,
			'required'           => true,
		),

		array(
			'name'               => 'WP GraphQL',
			'slug'               => 'wp-graphql',
			'force_activation'   => true,
			'force_deactivation' => false,
			'required'           => true,
		),

		array(
			'name'               => 'WP GraphQL (ACF)',
			'slug'               => 'wp-graphql-acf',
			'version'            => '0.5.3',
			'source'             => 'https://github.com/wp-graphql/wp-graphql-acf/archive/refs/tags/v0.5.3.zip',
			'force_activation'   => true,
			'force_deactivation' => false,
			'required'           => true,
		),
	);

	/*
	 * Array of configuration settings. Amend each line as needed.
	 *
	 * TGMPA will start providing localized text strings soon. If you already have translations of our standard
	 * strings available, please help us make TGMPA even better by giving us access to these translations or by
	 * sending in a pull-request with .po file(s) with the translations.
	 *
	 * Only uncomment the strings in the config array if you want to customize the strings.
	 */
	$config = array(
		'id'           => 'callboard', // Unique ID for hashing notices for multiple instances of TGMPA.
		'default_path' => '', // Default absolute path to bundled plugins.
		'menu'         => 'tgmpa-install-plugins', // Menu slug.
		'parent_slug'  => 'plugins.php', // Parent menu slug.
		'capability'   => 'manage_options', // Capability needed to view plugin install page, should be a capability associated with the parent menu used.
		'has_notices'  => true, // Show admin notices or not.
		'dismissable'  => false, // If false, a user cannot dismiss the nag message.
		'dismiss_msg'  => 'Please deal with your shit.', // If 'dismissable' is false, this message will be output at top of nag.
		'is_automatic' => false, // Automatically activate plugins after installation or not.
		'message'      => '', // Message to output right before the plugins table.
	);

	tgmpa( $plugins, $config );
}
add_action( 'tgmpa_register', 'callboard_register_required_plugins' );
