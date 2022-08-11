<?php
/**
 * Plugin Name: Callboard
 * Description: Callboard core.
 * Author: Nick Gaswirth
 * Author URI: https://roundhouse-designs.com
 * Version: 0.1
 *
 * @package callboard
 */

/**
 * Constants.
 */
define( 'CALLBOARD_PLUGIN_NAME', 'Callboard' );
define( 'CALLBOARD_VERSION', '0.0.2' );
define( 'CALLBOARD_CORE', __FILE__ );
define( 'CALLBOARD_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
define( 'CALLBOARD_DATE_FORMAT', 'Y-m-d' );

/**
 * Load the plugin.
 */
require_once CALLBOARD_PLUGIN_PATH . 'class-callboard.php';
$callboard = new Callboard();
