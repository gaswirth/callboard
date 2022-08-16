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
		$show  = new Callboard_Show();
		$users = new Callboard_Users();
		$show->register_cpt_show();
		$users->add_company_member_role();

		flush_rewrite_rules();
	}
}
