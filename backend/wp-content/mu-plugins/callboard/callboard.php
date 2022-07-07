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

/**
 * Load modules.
 */
require_once plugin_dir_path( __FILE__ ) . 'class-callboard.php';
require_once plugin_dir_path( __FILE__ ) . 'class-callboard-utils.php';
require_once plugin_dir_path( __FILE__ ) . 'class-callboard-graphql.php';
