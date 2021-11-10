<?php
/**
 * Utils.
 */

class Callboard_Utils extends Callboard {
	public function __construct() {
		add_filter( 'acf/validate_value/name=show_id', array( $this, 'callboard_acf_unique_value_field' ), 10, 4 );
	}

	/**
	 * Sanitizes date time input
	 * https://www.lehelmatyus.com/1416/sanitize-date-time-value-in-wordpress
	 *
	 * @param string $datetime The datetime string.
	 * @return string|false The sanitized datetime.
	 */
	public function sanitize_datetime( $datetime ) {
		error_log( 'sanitize_datetime RUN' );

		// General sanitization, to get rid of malicious scripts or characters
		$datetime = sanitize_text_field( $datetime );
		$datetime = filter_var( $datetime, FILTER_SANITIZE_STRING );

		// Validation to see if it is the right format
		if ( $this->validate_date( $datetime ) ) {
			return $datetime;
		}

		// default value, to return if checks have failed
		return false;
	}

/**
 * Validates that a date string is in the right format.
 * https://www.lehelmatyus.com/1003/android-change-date-format-from-utc-to-local-time
 *
 * @param string $date Datetime to check.
 * @param string $format The DateTime format.
 * @return bool True if a valid datetime string, false otherwise.
 */

	public function validate_date( $date, $format = 'g:i a' ) {
		// Create the format date
		$d = DateTime::createFromFormat( $format, $date );

		// Return the comparison
		return $d && $d->format( $format ) === $date;
	}

	/**
	 * Ensure unique meta values.
	 *
	 * @param mixed  $valid Whether or not the value is valid (boolean) or a custom error message (string).
	 * @param mixed  $value The field value.
	 * @param array  $field The field array containing all settings.
	 * @param string $input_name (string) The field DOM element name attribute.
	 * @return boolean Whether the value is unique or not.
	 */
	public function acf_unique_value_field( $valid, $value, $field, $input ) {
		if ( ! $valid || ( ! isset( $_POST['post_ID'] ) && ! isset( $_POST['post_id'] ) ) ) {
			return $valid;
		}
		if ( isset( $_POST['post_ID'] ) ) {
			$post_id = intval( $_POST['post_ID'] );
		} else {
			$post_id = intval( $_POST['post_id'] );
		}
		if ( ! $post_id ) {
			return $valid;
		}
		$post_type  = get_post_type( $post_id );
		$field_name = $field['name'];
		$args       = array(
			'post_type'    => $post_type,
			'post_status'  => 'publish, trash',
			'post__not_in' => array( $post_id ),
			'meta_query'   => array(
				array(
					'key'   => $field_name,
					'value' => $value,
				),
			),
		);
		$query = new WP_Query( $args );
		if ( count( $query->posts ) ) {
			return 'This Value is not Unique. Please enter a unique ' . $field['label'];
		}
		return true;
	}
}