<?php
/**
 * `Shows` data type.
 *
 * @package Callboard
 * @subpackage Callboard/includes
 *
 * @since 0.0.1
 */

/**
 * Callboard_Show class.
 *
 * @package Callboard
 * @subpackage Callboard/includes
 *
 * @since 0.0.1
 */
class Callboard_Show {
	/**
	 * The allowed status codes for show attendance.
	 *
	 * @var array
	 */
	const ALLOWED_STATUSES = ['in', 'out', 'pd', 'vac'];

	/**
	 * Register Post Type: Shows.
	 *
	 * @since 0.0.1
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
			'supports'              => ['title'],
			'show_in_graphql'       => true,
			'graphql_single_name'   => 'Show',
			'graphql_plural_name'   => 'Shows',
			'register_meta_box_cb'  => [$this, 'register_show_meta_boxes'],
		];

		register_post_type( 'show', $args );
	}

	/**
	 * Unregister the post type to remove it from memory.
	 *
	 * @access static
	 * @return void
	 */
	public static function unregister_cpt_show() {
		unregister_post_type( 'show' );
	}

	/**
	 * Adds `show` CPT meta boxes.
	 *
	 * @since 0.0.1
	 */
	public function register_show_meta_boxes() {
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
	 * @since 0.0.1
	 */
	public function show_data_fields() {
		global $post;

		wp_nonce_field( basename( __FILE__ ), 'show_data_nonce' );

		$meta = get_post_meta( $post->ID );

		// Set variables for the template.
		$template_vars = [
			'notes'      => isset( $meta['notes'] ) ? $meta['notes'][0] : '',
			'attendance' => isset( $meta['attendance'][0] ) ? Callboard_Functions::format_attendance_array_for_textarea( $meta['attendance'][0] ) : '',
		];

		// Load the template.
		Callboard_Loader::require_template( 'show-meta-template.php', $template_vars );
	}

	/**
	 * Save the metabox data.
	 *
	 * @since 0.0.1
	 *
	 * @param int $post_id The post ID.
	 */
	public function save_show_meta( $post_id ) {
		// Abort conditions.
		$is_autosave        = wp_is_post_autosave( $post_id );
		$is_revision        = wp_is_post_revision( $post_id );
		$is_user_authorized = current_user_can( 'edit_post', $post_id ) ? true : false;
		$is_valid_nonce     = isset( $_POST['show_data_nonce'] ) && wp_verify_nonce( $_POST['show_data_nonce'], basename( __FILE__ ) ) ? true : false;
		$show_data          = isset( $_POST['show_data'] ) ? array_map( 'sanitize_textarea_field', wp_unslash( $_POST['show_data'] ) ) : null;
		if ( $is_autosave || $is_revision || ! $is_user_authorized || ! $is_valid_nonce || ! $show_data ) {
			return;
		}

		$update_fields = $this->sanitize_show_meta( $show_data );
		$this->update_show_meta( $post_id, $update_fields );
	}

	/**
	 * Sanitize show meta values.
	 *
	 * @since 0.0.1
	 *
	 * @param array $show_data An array of meta values, keyed by field.
	 */
	public function sanitize_show_meta( $show_data ) {
		$update_fields = [
			'notes'      => '',
			'attendance' => '',
		];

		if ( isset( $show_data['notes'] ) && $show_data['notes'] ) {
			$update_fields['notes'] = sanitize_textarea_field( $show_data['notes'] );
		}

		if ( isset( $show_data['attendance'] ) ) {
			$update_fields['attendance'] = $this->convert_attendance_string_to_array( $show_data['attendance'] );
		}

		return $update_fields;
	}

	/**
	 * Update the show meta fields.
	 *
	 * @since 0.0.1
	 *
	 * @param int   $post_id The post ID.
	 * @param array $fields  The values to update, keyed by field.
	 */
	public function update_show_meta( $post_id, $fields ) {
		foreach ( $fields as $field => $new_value ) {
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
	 * Validate an attendance status.
	 *
	 * @param  string    $status The attendance code to validate.
	 * @return boolean
	 */
	public function validate_attendance_status( $status ) {
		if ( ! in_array( $status, self::ALLOWED_STATUSES, true ) ) {
			return false;
		}

		return true;
	}

	/**
	 * Sanitizes the values in an `attendance` meta field array.
	 *
	 * @param  string $arr_string A multiline input string of user_id:status pairs.
	 * @return array  The assembled array.
	 */
	public function convert_attendance_string_to_array( $arr_string ) {
		// Convert the pairs to an array.
		$array = preg_split( '/\r\n|\r|\n/', $arr_string );

		$sanitized = [];
		foreach ( $array as $item ) {
			// loop through and extract each value.

			/**
			 * $matches[1]: key
			 * $matches[2]: value
			 */
			$result = preg_match( '/(.*):(.*)$/', $item, $matches );

			if ( $result && isset( $matches[1] ) && isset( $matches[2] ) ) {
				$key   = esc_attr( trim( $matches[1] ) );
				$value = trim( $matches[2] );

				if ( $this->validate_attendance_status( $value ) ) {
					// If a value is invalid, skip it.
					$sanitized[$key] = $value;
				}
			}
		}

		return $sanitized;
	}

	/**
	 * Checks if a duplicate
	 *
	 * @param  string  $datetime The `datetime` meta value to query for.
	 * @return boolean True if the datetime is unique, false otherwise.
	 */
	public static function datetime_is_unique( $datetime ) {
		// MAYBE Deprecate

		$_date = new DateTime( $datetime );

		$shows = get_posts( [
			'post_type'      => 'show',
			'post_status'    => ['publish', 'future'],
			'date_query'     => [
				'year'   => $_date->format( 'Y' ),
				'month'  => $_date->format( 'm' ),
				'day'    => $_date->format( 'd' ),
				'hour'   => $_date->format( 'H' ),
				'minute' => $_date->format( 'i' ),
			],
			'posts_per_page' => 1,
		] );

		return $shows ? false : true;
	}
}
