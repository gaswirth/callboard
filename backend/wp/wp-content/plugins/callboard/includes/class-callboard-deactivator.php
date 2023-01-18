<?php
/**
 * Fired during plugin deactivation
 *
 * @package Callboard
 * @subpackage Callboard/includes
 *
 * @since   0.0.2
 */

/**
 * Fired during plugin deactivation.
 *
 * This class defines all code necessary to run during the plugin's deactivation.
 *
 * @package Callboard
 * @subpackage Callboard/includes
 *
 * @since   0.0.2
 */
class Callboard_Deactivator {
	/**
	 * Runs on plugin activation.
	 *
	 * @since 0.0.1
	 */
	public static function deactivate() {
		Callboard_Show::unregister_cpt_show();
		Callboard_Users::remove_company_member_role();

		flush_rewrite_rules();
	}
}
