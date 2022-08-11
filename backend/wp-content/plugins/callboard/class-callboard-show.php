<?php
/**
 * `Shows` data type.
 *
 * @since 1.0.0
 * @package Callboard
 * @subpackage Callboard/includes
 */

/**
 * Callboard_Show class.
 *
 * @since 1.0.0
 * @package Callboard
 * @subpackage Callboard/includes
 */
class Callboard_Show {
	/**
	 * Register Post Type: Shows.
	 *
	 * @since 1.0.0
	 */
	public function register_cpt_show() {
		$labels = [
			'name'                     => __( 'Shows', 'callboard' ),
			'singular_name'            => __( 'Show', 'callboard' ),
			'menu_name'                => __( 'Shows', 'callboard' ),
			'all_items'                => __( 'All Shows', 'callboard' ),
			'add_new'                  => __( 'Add new', 'callboard' ),
			'add_new_item'             => __( 'Add new Show', 'callboard' ),
			'edit_item'                => __( 'Edit Show', 'callboard' ),
			'new_item'                 => __( 'New Show', 'callboard' ),
			'view_item'                => __( 'View Show', 'callboard' ),
			'view_items'               => __( 'View Shows', 'callboard' ),
			'search_items'             => __( 'Search Shows', 'callboard' ),
			'not_found'                => __( 'No Shows found', 'callboard' ),
			'not_found_in_trash'       => __( 'No Shows found in trash', 'callboard' ),
			'parent'                   => __( 'Parent Show:', 'callboard' ),
			'featured_image'           => __( 'Featured image for this Show', 'callboard' ),
			'set_featured_image'       => __( 'Set featured image for this Show', 'callboard' ),
			'remove_featured_image'    => __( 'Remove featured image for this Show', 'callboard' ),
			'use_featured_image'       => __( 'Use as featured image for this Show', 'callboard' ),
			'archives'                 => __( 'Show archives', 'callboard' ),
			'insert_into_item'         => __( 'Insert into Show', 'callboard' ),
			'uploaded_to_this_item'    => __( 'Upload to this Show', 'callboard' ),
			'filter_items_list'        => __( 'Filter Shows list', 'callboard' ),
			'items_list_navigation'    => __( 'Shows list navigation', 'callboard' ),
			'items_list'               => __( 'Shows list', 'callboard' ),
			'attributes'               => __( 'Shows attributes', 'callboard' ),
			'name_admin_bar'           => __( 'Show', 'callboard' ),
			'item_published'           => __( 'Show published', 'callboard' ),
			'item_published_privately' => __( 'Show published privately.', 'callboard' ),
			'item_reverted_to_draft'   => __( 'Show reverted to draft.', 'callboard' ),
			'item_scheduled'           => __( 'Show scheduled', 'callboard' ),
			'item_updated'             => __( 'Show updated.', 'callboard' ),
			'parent_item_colon'        => __( 'Parent Show:', 'callboard' ),
		];

		$args = [
			'label'                 => __( 'Shows', 'callboard' ),
			'labels'                => $labels,
			'description'           => '',
			'menu_icon'             => 'dashicons-tickets-alt',
			'public'                => true,
			'publicly_queryable'    => true,
			'show_ui'               => true,
			'show_in_rest'          => true,
			'rest_base'             => '',
			'rest_controller_class' => 'WP_REST_Posts_Controller',
			'rest_namespace'        => 'wp/v2',
			'has_archive'           => false,
			'show_in_menu'          => true,
			'show_in_nav_menus'     => true,
			'delete_with_user'      => false,
			'exclude_from_search'   => false,
			'capability_type'       => 'post',
			'map_meta_cap'          => true,
			'hierarchical'          => false,
			'can_export'            => false,
			'rewrite'               => [
				'slug'       => 'show',
				'with_front' => true,
			],
			'query_var'             => true,
			'supports'              => [''],
			'show_in_graphql'       => true,
			'graphql_single_name'   => 'Show',
			'graphql_plural_name'   => 'Shows',
			'register_meta_box_cb'  => [$this, 'register_show_company_names'],
		];

		register_post_type( 'show', $args );
	}

	/**
	 * Adds `show` CPT meta boxes.
	 *
	 * @since 1.0.0
	 */
	public function register_show_company_names() {
		add_meta_box(
			'show_data',
			__( 'Show Details', 'callboard' ),
			[$this, 'show_data_fields'],
			'show',
			'normal',
			'high'
		);
	}

	/**
	 * Render the `show` meta fields.
	 *
	 * @since 1.0.0
	 */
	public function show_data_fields() {
		global $post;

		wp_nonce_field( basename( __FILE__ ), 'show_data_nonce' );

		$meta = get_post_meta( $post->ID );

		$attendance = isset( $meta['attendance'] ) ? esc_textarea( $this->format_attendance_array_for_textarea( $meta['attendance'][0] ) ) : '';

		echo '<style>
				.columns {
					display: flex;
					justify-content: flex-start;
					flex-wrap: wrap;
				}
				.column {
					flex: 1 1 33%;
					padding: 0 1%;
				}
				label {
					display: inline-block;
					font-weight: bold;
				}
				.warning {
					font-size: 1.2em;
					font-weight: bold;
				}
			</style>';

		printf(
			'<p class="warning">%1$s</p>
			<div class="columns">
				<div class="column">
					<label for="show_data[datetime]">
						%2$s: <code><a href="https://www.php.net/manual/en/datetime.format.php" target="_blank">%3$s</a></code>
					</label>
					<input type="text" id="show_data[datetime]" name="show_data[datetime]" placeholder="10/12/2022 08:00 PM" value="%4$s">
				</div>
				<div class="column">
					<label for="show_data[attendance]">Attendance</label>
					<p>%5$s <code>user_id : status</code></p>
					<p>Allowed status values: <code>%6$s</code></p>
					<textarea id="show_data[attendance]" name="show_data[attendance]" class="widefat">%7$s</textarea>
				</div>
			</div>',
			esc_html__( 'WARNING: DO NOT EDIT THESE FIELDS MANUALLY.', 'callboard' ),
			esc_html__( 'Date Format', 'callboard' ),
			esc_textarea( Callboard::DATETIME_FORMAT, 'callboard' ),
			isset( $meta['datetime'] ) ? esc_textarea( $meta['datetime'][0] ) : '',
			esc_html__( 'Format each pair on a separate line as', 'callboard' ),
			implode( '</code><code>', ['in', 'out', 'vac', 'pd'] ),
			esc_html__( $attendance ),
		);
	}

	/**
	 * Save the metabox data.
	 *
	 * @since 1.0.0
	 * @param int $post_id The post ID.
	 */
	public function save_show_meta( $post_id ) {
		// Abort conditions.
		$is_autosave        = wp_is_post_autosave( $post_id );
		$is_revision        = wp_is_post_revision( $post_id );
		$is_user_authorized = current_user_can( 'edit_post', $post_id ) ? true : false;
		$is_valid_nonce     = isset( $_POST['show_data_nonce'] ) && wp_verify_nonce( $_POST['show_data_nonce'], basename( __FILE__ ) ) ? true : false;

		if ( $is_autosave || $is_revision || ! $is_user_authorized || ! $is_valid_nonce ) {
			return;
		}

		$update_fields = [];

		if ( isset( $_POST['show_data'] ) ) {
			$show_data = array_map( 'sanitize_textarea_field', wp_unslash( $_POST['show_data'] ) );

			if ( isset( $show_data['datetime'] ) && $show_data['datetime'] ) {
				$datetime                  = $show_data['datetime'];
				$update_fields['datetime'] = Callboard_Functions::validate_date_string( $datetime ) ? $datetime : get_post_meta( $post_id, 'datetime', true );
			}

			if ( isset( $show_data['attendance'] ) && $show_data['attendance'] ) {
				$update_fields['attendance'] = $this->sanitize_attendance_string_to_array( $show_data['attendance'] );
			}
		}

		foreach ( $update_fields as $field => $new_value ) {
			if ( $new_value ) {
				// Add or update the post meta.
				update_post_meta( $post_id, $field, $new_value );
			} else {
				// Delete the meta key if there's no value.
				delete_post_meta( $post_id, $field );
			}
		}
	}

	/**
	 * Converts the $user_id => $status key/value pairs to a string (one per line) for backend use.
	 *
	 * @param  array|string $attendance The attendance array of $user_id => $status.
	 * @return string       The formatted string of key : value pairs.
	 */
	public function format_attendance_array_for_textarea( $attendance ) {
		if ( is_string( $attendance ) ) {
			$attendance = maybe_unserialize( $attendance );
		}

		$lines = [];
		foreach ( $attendance as $user_id => $status ) {
			$lines[] = sprintf( '%1$s : %2$s', $user_id, $status );
		}

		return implode( "\n", $lines );
	}

	/**
	 * Sanitizes the values in an `attendance` meta field array.
	 *
	 * @param string $arr_string A multiline input string of user_id:status pairs.
	 * @return array The assembled array.
	 */
	public function sanitize_attendance_string_to_array( $arr_string ) {
		// MAYBE Allow only valid status values (in/out/vac/pd).

		// Serialize the data first.
		$array = preg_split( '/\r\n|\r|\n/', $arr_string );

		$value = [];
		foreach ( $array as $item ) {
			// loop through and sanitize each value, then `update_post_meta`.
			$result = preg_match( '/(.*):(.*)$/', $item, $matches );

			/**
			 * $matches[1]: key
			 * $matches[2]: value
			 *
			 * Trim whitespace from beginning and end of both `key` and `value`.
			 */
			if ( $result && isset( $matches[1] ) && isset( $matches[2] ) ) {
				$value[esc_textarea( trim( $matches[1] ) )] = trim( $matches[2] );
			}
		}

		return $value;
	}
}
