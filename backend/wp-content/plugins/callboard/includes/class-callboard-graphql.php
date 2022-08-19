<?php
/**
 * GraphQL.
 *
 * @package Callboard
 * @subpackage Callboard/includes
 *
 * @since 0.0.2
 */

/**
 * Callboard_GraphQL class.
 *
 * @package Callboard
 * @subpackage Callboard/includes
 *
 * @since 0.0.2
 */
class Callboard_GraphQL {
	/**
	 * The frontend app URL.
	 *
	 * @access protected
	 * @var string
	 * @since 0.0.2
	 */
	protected $frontend_url;

	/**
	 * Constructor.
	 *
	 * @since 0.0.2
	 *
	 * @param string $frontend_url The frontend app URL.
	 */
	public function __construct( $frontend_url = '' ) {
		$this->frontend_url = $frontend_url;
	}
}
