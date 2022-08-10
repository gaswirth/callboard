<?php
/**
 * Callboard base class.
 *
 * @package Callboard
 */

/**
 * Main plugin class.
 */
class Callboard {
	/**
	 * The plugin name.
	 *
	 * @var string
	 */
	protected $plugin_name;

	/**
	 * The plugin version.
	 *
	 * @var string
	 */
	protected $version;

	/**
	 * The headless frontend URL.
	 *
	 * @var string
	 */
	public const HEADLESS_FRONTEND_URL = 'http://localhost'; // TODO set this in options somewhere.

	/**
	 * Data fields to handle for the `show` post type.
	 */
	private const SHOW_DATA_FIELDS = [
		'datetime'   => 'datetime_string',
		'attendance' => 'array',
	];

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->plugin_name = defined( 'CALLBOARD_PLUGIN_NAME' ) ? CALLBOARD_PLUGIN_NAME : 'Callboard';

		if ( defined( 'CALLBOARD_VERSION' ) ) {
			$this->version = CALLBOARD_VERSION;
		} else {
			$this->version = '1.0.0';
		}

		$this->load_dependencies();
		$this->define_public_hooks();
	}

	/**
	 * Load plugin dependencies.
	 *
	 * @return void
	 */
	public function load_dependencies() {
		require_once CALLBOARD_PLUGIN_PATH . 'class-callboard-users.php';
		require_once CALLBOARD_PLUGIN_PATH . 'class-callboard-functions.php';
		require_once CALLBOARD_PLUGIN_PATH . 'class-callboard-graphql.php';
	}

	/**
	 * Register actions and filters.
	 *
	 * @return void
	 */
	public function define_public_hooks() {
		add_action( 'init', [$this, 'register_cpt_show'] );
		add_filter( 'init', [$this, 'register_settings_fields'] );
		add_action( 'save_post', [$this, 'save_show_meta'], 1, 2 );
	}

	/**
	 * Getter for the custom `show` meta fields constant.
	 */
	public function show_fields() {
		return self::SHOW_DATA_FIELDS;
	}

	/**
	 * Register settings fields.
	 *
	 * @return void
	 */
	public function register_settings_fields() {
		register_setting(
			'callboard_options',
			'company_name',
			[
				'type'              => 'string',
				'sanitize_callback' => 'esc_textarea',
				'default'           => null,
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

		$attendance = isset( $meta['attendance'] ) ? esc_textarea( Callboard_Functions::format_attendance_array_for_textarea( $meta['attendance'][0] ) ) : '';

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
					<input type="text" id="show_data[datetime]" name="show_data[datetime]" placeholder="10/12/2022 08:00 PM" value="%4$s>">
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
			esc_textarea( CALLBOARD_DATETIME_FORMAT, 'callboard' ),
			isset( $meta['datetime'] ) ? esc_textarea( $meta['datetime'][0] ) : '',
			esc_html__( 'Format each pair on a separate line as', 'callboard' ),
			implode( '</code><code>', ['in', 'out', 'vac', 'pd'] ),
			esc_html__( $attendance ),
		);
	}

	/**
	 * Save the metabox data.
	 *
	 * @param int     $post_id The post ID.
	 * @param WP_Post $post    The post object.
	 */
	public function save_show_meta( $post_id, $post ) {
		// Abort conditions.
		$is_autosave        = wp_is_post_autosave( $post_id );
		$is_revision        = wp_is_post_revision( $post_id );
		$is_user_authorized = current_user_can( 'edit_post', $post_id ) ? true : false;
		$is_valid_nonce     = isset( $_POST['show_data_nonce'] ) && wp_verify_nonce( $_POST['show_data_nonce'], basename( __FILE__ ) ) ? true : false;

		if ( $is_autosave || $is_revision || ! $is_user_authorized || ! $is_valid_nonce ) {
			return;
		}

		$fields_present = [];
		foreach ( $this->show_fields() as $field => $type ) {
			if ( isset( $_POST['show_data'][$field] ) ) {
				$fields_present[] = [
					'key'   => $field,
					'type'  => $type,
					// phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- Sanitized as $fields_present in foreach loop, below.
					'value' => wp_unslash( $_POST['show_data'][$field] ),
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
					// Serialize the data first.
					$array = preg_split( '/\r\n|\r|\n/', $field['value'] );

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
				// Delete the meta key if there's no value.
				delete_post_meta( $post_id, $field['key'] );
			}
		}
	}
}

$callboard = new Callboard();
