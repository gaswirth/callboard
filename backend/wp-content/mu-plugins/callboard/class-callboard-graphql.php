<?php
/**
 * GraphQL.
 */

// FIXME Wellll none of this works.
class Callboard_GraphQL extends Callboard {
	public function __construct() {
		add_action( 'register_types', $this->register_types() );
		add_filter( 'show_after_datetime_query_args', $this->show_range_datetime_query_args(), 10, 5 );
	}

	/**
	 * Undocumented function
	 *
	 * @return void
	 */
	public function register_types() {
		$cpt_graphql_single_name = "Show";

		register_graphql_field( 'RootQueryTo' . $cpt_graphql_single_name . 'ConnectionWhereArgs', 'datetime', [
			'type'        => 'String',
			'description' => __( 'The datetime of the post object to filter by.', 'rhd' ),
		] );
	}

	/**
	 * The meta query for shows with a later `datetime` than the specified show.
	 *
	 * @param array       $query_args  The args that will be passed to the WP_Query
	 * @param mixed       $source The source that’s passed down the GraphQL queries
	 * @param array       $args The inputArgs on the field
	 * @param AppContext  $context The AppContext passed down the GraphQL tree
	 * @param ResolveInfo $info The ResolveInfo passed down the GraphQL tree
	 * @return array The filtered query args.
	 */
	public function show_range_datetime_query_args( $query_args, $source, $args, $context, $info ) {
		$show_datetime = $args['where']['datetime'];

		if ( isset( $show_datetime ) ) {
			$query_args['meta_query'] = array(
				array(
					'key'     => 'datetime',
					'value'   => $show_datetime,
					'compare' => '<=',
					'type'    => 'DATE',
				),
				array(
					'key'     => 'datetime',
					'value'   => $show_datetime,
					'compare' => '>=',
					'type'    => 'DATE',
				),
			);
		}

		return $query_args;
	}
}
