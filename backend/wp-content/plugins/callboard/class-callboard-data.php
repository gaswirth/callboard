<?php
/**
 * Registration for Callboard CPTs and custom fields.
 */

class Callboard_Data extends Callboard {
	private const SHOW_FIELDS = array(
		'datetime'   => 'datetime_string',
		'attendance' => 'array',
	);

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'register_cpt_show' ) );
		add_action( 'save_post', array( $this, 'save_show_meta' ), 1, 2 );
	}

	/**
	 * Custom fields getter for the `show` meta fields constant.
	 */
	public function showFields() {
		return self::SHOW_FIELDS;
	}

	/**
	 * Register Post Type: Shows.
	 */
	public function register_cpt_show() {
		$labels = array(
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
		);

		$args = array(
			'label'                 => __( 'Shows', 'callboard' ),
			'labels'                => $labels,
			'description'           => '',
			'menu_icon'             => 'dashicons-star-filled',
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
			'rewrite'               => array( 'slug' => 'show', 'with_front' => true ),
			'query_var'             => true,
			'supports'              => array( 'title', 'thumbnail' ),
			'show_in_graphql'       => true,
			'graphql_single_name'   => 'Show',
			'graphql_plural_name'   => 'Shows',
			'register_meta_box_cb'  => array( $this, 'register_show_custom_fields' ),
		);

		register_post_type( 'show', $args );
	}

	/**
	 * Adds `show` CPT meta boxes.
	 */
	public function register_show_custom_fields() {
		add_meta_box(
			'datetime',
			__( 'Show Date/Time', 'callboard' ),
			array( $this, 'show_datetime_field' ),
			'show',
			'normal',
			'high'
		);

		add_meta_box(
			'attendance',
			sprintf( '%1$s (%2$s)',
				__( 'Company Attendance', 'callboard' ),
				__( 'DO NOT EDIT MANUALLY', 'callboard' ) ),
			array( $this, 'show_attendance_field' ),
			'show',
			'normal',
			'high'
		);
	}

	/**
	 * Custom field callback: `datetime`
	 */
	public function show_datetime_field() {
		global $post;

		// Nonce field to validate form request came from current site.
		wp_nonce_field( basename( __FILE__ ), 'datetime_nonce' );

		// Get the datetime data if it's already been entered.
		$datetime = get_post_meta( $post->ID, 'datetime', true );

		// Helper text.
		$description = sprintf( '<a href="%1$s" target="_blank">%2$s</a>: <code>%3$s</code>', esc_url( 'https://www.php.net/manual/en/datetime.format.php' ), __( 'Date Format', 'callboard' ), CALLBOARD_DATETIME_FORMAT );

		// Output the field
		printf( '<p>%s</p>', $description );
		printf( '<input type="text" name="datetime" value="%s" class="widefat">', esc_textarea( $datetime ) );
	}

	/**
	 * Custom field callback: `attendance`
	 */
	public function show_attendance_field() {
		global $post;

		// Nonce field to validate form request came from current site
		wp_nonce_field( basename( __FILE__ ), 'attendance_nonce' );

		// Get the attendance data if it's already been entered
		$attendance = maybe_unserialize( get_post_meta( $post->ID, 'attendance', true ) );

		// Helper text.
		$description      = __( 'Format each pair as <code>user_id : status</code>, separated by line.', 'callboard' );
		$allowed_statuses = 'Allowed status values: <code>' . implode( '</code><code>', array( 'in', 'out', 'vac', 'pd' ) ) . '</code>';

		// Output the description and field
		printf( '<p>%1$s %2$s</p>', $description, $allowed_statuses );
		printf( '<textarea name="attendance" class="widefat">%s</textarea>', Callboard_Functions::format_attendance_array_for_textarea( $attendance ) );
	}

/**
 * Save the metabox data
 */
	public function save_show_meta( $post_id, $post ) {

		// Return if the user doesn't have edit permissions.
		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return $post_id;
		}

		// Verify this came from the our screen and with proper authorization,
		// because save_post can be triggered at other times.
		foreach ( $this->showFields() as $field => $value ) {
			if ( ! isset( $_POST[$field . '_nonce'] ) || ! wp_verify_nonce( $_POST[$field . '_nonce'], basename( __FILE__ ) ) ) {

				// Return unless all nonces are found.
				return $post_id;
			}

		}

		$fields_present = array();
		foreach ( $this->showFields() as $field => $type ) {
			if ( isset( $_POST[$field] ) ) {
				$fields_present[] = array(
					'key'   => $field,
					'type'  => $type,
					'value' => $_POST[$field],
				);
			}

			// Bounce if none of the Show meta fields are present in $_POST.
			if ( empty( $fields_present ) ) {
				return $post_id;
			}
		}

		// Don't store custom data twice
		if ( 'revision' === $post->post_type ) {
			return;
		}

		// Now that we're authenticated, time to save the data.
		// This sanitizes the data from the field and saves it.
		foreach ( $fields_present as $field ) {
			switch ( $field['type'] ) {
				case 'string':
					$value = esc_textarea( $field['value'] );
					break;

				case 'datetime_string':
					// Make sure this resolves to a real DateTime(), and restore the old value if it doesn't.
					$value = Callboard_Functions::validate_date_string( $field['value'] ) ? $field['value'] : get_post_meta( $post_id, $field['key'], true );

					break;

				case 'array':
					// Serialize the data first
					$array = preg_split( '/\r\n|\r|\n/', $field['value'] );

					$value = array();
					foreach ( $array as $item ) {
						// loop through and sanitize each value, then update_post_meta
						$result = preg_match( '/(.*):(.*)$/', $item, $matches );

						/**
						 * $matches[1]: key
						 * @matches[2]: value
						 *
						 * Trim whitespace from beginning and end of both `key` and `value`.
						 */
						if ( $result && isset( $matches[1] ) && isset( $matches[2] ) ) {
							$value[esc_textarea( trim( $matches[1] ) )] = trim( $matches[2] );
						}
					}
					break;

				default:
					$value = '';
			}

			if ( $value ) {
				// Add or update the post meta.
				update_post_meta( $post_id, $field['key'], $value );

				if ( 'datetime_string' === $field['type'] ) {
					// Update the hidden _show_date field for WP_Query comparisions.
					$date = new DateTime( $field['value'] );

					update_post_meta( $post_id, '_show_date', $date->format( CALLBOARD_DATE_FORMAT ) );
				}
			} else {
				// Delete the meta key if there's no value
				delete_post_meta( $post_id, $field['key'] );
			}
		}
	}
}

$graphql = new Callboard_Data();
