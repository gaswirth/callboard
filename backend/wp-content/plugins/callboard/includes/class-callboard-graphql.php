<?php
/**
 * GraphQL.
 *
 * @package Callboard
 * @subpackage Callboard/includes
 *
 * @since 0.0.1
 */

/**
 * Callboard_GraphQL class.
 *
 * @package Callboard
 * @subpackage Callboard/includes
 *
 * @since 0.0.1
 */
class Callboard_GraphQL {
	/**
	 * The frontend app URL.
	 *
	 * @access protected
	 * @var string
	 * @since 0.0.1
	 */
	protected $frontend_url;

	/**
	 * Constructor.
	 *
	 * @since 0.0.1
	 *
	 * @param string $frontend_url The frontend app URL.
	 */
	public function __construct( $frontend_url = '' ) {
		$this->frontend_url = $frontend_url;
	}

	/**
	 * Adds the `future` post status to all `show` queries.
	 *
	 * @since 0.0.3
	 *
	 * @param  WP_Query $query
	 * @return void
	 */
	public function modify_show_query( $query ) {
		$post_type = $query->get( 'post_type' );
		if ( 'string' === gettype( $post_type ) ) {
			return;
		}

		if ( in_array( 'show', $query->get( 'post_type' ), true ) ) {
			$query->set( 'post_status', ['publish', 'future'] );
		}
	}
}
