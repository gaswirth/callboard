<?php
/**
 * Callboard base class.
 */
class Callboard {
	private const SHOW_DATA_FIELDS = [
		'datetime'   => 'datetime_string',
		'attendance' => 'array',
	];

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'init', [$this, 'register_cpt_show'] );
		add_filter( 'init', [$this, 'register_settings_fields'] );

		add_action( 'save_post', [$this, 'save_show_meta'], 1, 2 );
	}

	/**
	 * Getter for the custom `show` meta fields constant.
	 */
	public function showFields() {
		return self::SHOW_DATA_FIELDS;
	}

	public function register_settings_fields() {
		register_setting(
			'callboard_options',
			'company_name',
			[
				'type'              => 'string',
				'sanitize_callback' => 'esc_textarea',
				'default'           => NULL,
				'show_in_graphql'   => true,
			]
		);
	}

	/**
	 * Register Post Type: Shows.
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
			'rewrite'               => ['slug' => 'show', 'with_front' => true],
			'query_var'             => true,
			'supports'              => [''], // Needs an empty value in the array or it defaults to ['title', 'editor].
			'show_in_graphql'       => true,
			'graphql_single_name'   => 'Show',
			'graphql_plural_name'   => 'Shows',
			'register_meta_box_cb'  => [$this, 'register_show_company_names'],
		];

		register_post_type( 'show', $args );
	}

	/**
	 * Adds `show` CPT meta boxes.
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
	 */
	public function show_data_fields() {
		global $post;

		wp_nonce_field( basename( __FILE__ ), 'show_data_nonce' );

		$meta = get_post_meta( $post->ID );
		?>

		<style>
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
		</style>

		<p class="warning"><?php esc_html_e( 'WARNING: DO NOT EDIT THESE FIELDS MANUALLY.', 'callboard' ); ?></p>
		<div class="columns">
			<div class="column">
				<label for="show_data[datetime]">
					<a href="https://www.php.net/manual/en/datetime.format.php" target="_blank"><?php esc_html_e( 'Date Format', 'callboard' ); ?></a>: <code><?php echo esc_textarea( CALLBOARD_DATETIME_FORMAT, 'callboard' ); ?></code>
				</label>
				<input type="text" id="show_data[datetime]" name="show_data[datetime]" placeholder="10/12/2022 08:00 PM" value="<?php echo isset( $meta['datetime'] ) ? esc_textarea(  $meta['datetime'][0] ) : ''; ?>">
			</div>
			<div class="column">
				<label for="show_data[attendance]">Attendance</label>
				<p><?php esc_html_e( 'Format each pair on a separate line as', 'callboard'); ?> <code>user_id : status</code></p>
				<p>Allowed status values: <code><?php echo implode( '</code><code>', ['in', 'out', 'vac', 'pd'] ); ?></code></p>
				<textarea id="show_data[attendance]" name="show_data[attendance]" class="widefat"><?php echo isset( $meta['attendance'] ) ? Callboard_Functions::format_attendance_array_for_textarea( $meta['attendance'][0] ) : ''; ?></textarea>
			</div>
		</div>

		<?php
	}

/**
 * Save the metabox data
 */
	public function save_show_meta( $post_id, $post ) {
		// Escape conditions.
		$is_autosave        = wp_is_post_autosave( $post_id );
		$is_revision        = wp_is_post_revision( $post_id );
		$is_user_authorized = current_user_can( 'edit_post', $post_id ) ? true : false;
		$is_valid_nonce     = isset( $_POST['show_data_nonce'] ) && wp_verify_nonce( $_POST['show_data_nonce'], basename( __FILE__ ) ) ? true : false;

		if ( $is_autosave || $is_revision || ! $is_user_authorized || ! $is_valid_nonce ) {
			return;
		}

		$fields_present = [];
		foreach ( $this->showFields() as $field => $type ) {
			if ( isset( $_POST['show_data'][$field] ) ) {
				$fields_present[] = [
					'key'   => $field,
					'type'  => $type,
					'value' => $_POST['show_data'][$field],
				];
			}

			// Bounce if none of the Show meta fields are present in $_POST.
			if ( empty( $fields_present ) ) {
				return $post_id;
			}
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

				case 'checkbox':
					$value = esc_attr( $field['value'] );
					break;

				case 'array':
					// Serialize the data first
					$array = preg_split( '/\r\n|\r|\n/', $field['value'] );

					$value = [];
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
					// Update the `_show_date` hidden companion field for some WP_Query range comparisions.
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

$callboard = new Callboard();
