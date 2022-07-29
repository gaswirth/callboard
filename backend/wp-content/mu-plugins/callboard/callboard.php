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
define( 'CALLBOARD_VERSION', '0.0.1' );
define( 'CALLBOARD_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );

/**
 * Load modules.
 */
require_once CALLBOARD_PLUGIN_PATH . 'class-callboard.php';
require_once CALLBOARD_PLUGIN_PATH . 'class-callboard-functions.php';
require_once CALLBOARD_PLUGIN_PATH . 'class-callboard-graphql.php';
