<?php
/**
 * Plugin Name: Callboard
 * Description: Callboard core.
 * Author: Nick Gaswirth
 * Author URI: https://roundhouse-designs.com
 * Version: 0.0.1
 *
 * @package callboard
 */

/**
 * Constants.
 */
define( 'CALLBOARD_VERSION', '0.0.1' );
define( 'CALLBOARD_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-callboard-activator.php
 *
 * @since 0.0.1
 */
function activate_callboard() {
	require_once CALLBOARD_PLUGIN_PATH . 'includes/class-callboard-activator.php';
	Callboard_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-callboard-deactivator.php
 *
 * @since 0.0.1
 */
function deactivate_callboard() {
	require_once CALLBOARD_PLUGIN_PATH . 'includes/class-callboard-deactivator.php';
	Callboard_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_callboard' );
register_deactivation_hook( __FILE__, 'deactivate_callboard' );

/**
 * The core plugin class.
 */
require_once CALLBOARD_PLUGIN_PATH . 'includes/class-callboard.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since 0.0.1
 */
function run_callboard() {

	$callboard = new Callboard();
	$callboard->run();
}

run_callboard();
