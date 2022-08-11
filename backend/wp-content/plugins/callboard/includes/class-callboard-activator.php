<?php
/**
 * Fired during plugin activation
 *
 * @package Callboard
 * @subpackage Callboard/includes
 *
 * @since   0.0.2
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @package Callboard
 * @subpackage Callboard/includes
 *
 * @since   0.0.2
 */
class Callboard_Activator {
	/**
	 * Runs on plugin activation.
	 *
	 * @since 0.0.2
	 */
	public static function activate() {
		Callboard_Users::add_company_member_role();
	}
}
