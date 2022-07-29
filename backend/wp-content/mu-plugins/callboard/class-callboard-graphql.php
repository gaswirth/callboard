<?php
/**
 * GraphQL.
 */

class Callboard_GraphQL extends Callboard {
	public function __construct() {
		add_action( 'graphql_register_types', array( $this, 'register_types' ) );
		// add_filter( 'graphql_register_types', array( $this, 'register_mutations' ) );
		add_filter( 'graphql_post_object_connection_query_args', array( $this, 'show_range_datetime_query_args' ), 10, 5 );
	}

	/**
	 * Register the custom `datetime` field with GraphQL.
	 *
	 * @return void
	 */
	public function register_types() {
		$cpt_graphql_single_name = 'Show';

		register_graphql_field(
			'RootQueryTo' . $cpt_graphql_single_name . 'ConnectionWhereArgs',
			'showsBefore',
			array(
				'type'        => 'String',
				'description' => __( 'The start of the showtime filter range (inclusive).', 'rhd' ),
			)
		);

		register_graphql_field(
			'RootQueryTo' . $cpt_graphql_single_name . 'ConnectionWhereArgs',
			'showsAfter',
			array(
				'type'        => 'String',
				'description' => __( 'The end of the showtime filter range (inclusive).', 'rhd' ),
			)
		);
	}

	/**
	 * The meta query for shows
	 *
	 * @param array       $query_args  The args that will be passed to the WP_Query
	 * @param mixed       $source The source that’s passed down the GraphQL queries
	 * @param array       $args The inputArgs on the field
	 * @param AppContext  $context The AppContext passed down the GraphQL tree
	 * @param ResolveInfo $info The ResolveInfo passed down the GraphQL tree
	 * @return array The filtered query args.
	 */
	public function show_range_datetime_query_args( $query_args, $source, $args, $context, $info ) {
		$before = isset( $args['where']['showsBefore'] ) ? $args['where']['showsBefore'] : false;
		$after  = isset( $args['where']['showsAfter'] ) ? $args['where']['showsAfter'] : false;

		// If a range has been set, alter the query filter
		// Using a 'before' and 'after' filter to include range endpoints.
		if ( $before && $after ) {
			$query_args['meta_query'] = array(
				'relation' => 'AND',
				array(
					'key'     => 'datetime',
					'value'   => $before,
					'compare' => '<=',
					'type'    => 'DATE',
				),
				array(
					'key'     => 'datetime',
					'value'   => $after,
					'compare' => '>=',
					'type'    => 'DATE',
				),
			);
		}

		return $query_args;
	}
}

$graphql = new Callboard_GraphQL();
