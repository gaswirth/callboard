<?php
/**
 * Fired during plugin activation
 *
 * @since   1.0.0
 * @package Callboard
 * @subpackage Callboard/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since   1.0.0
 * @package Callboard
 * @subpackage Callboard/includes
 */
class Callboard_Activator {
	/**
	 * Runs on plugin activation.
	 *
	 * @since 1.0.0
	 */
	public static function activate() {
		Callboard_Users::add_company_member_role();
	}
}
