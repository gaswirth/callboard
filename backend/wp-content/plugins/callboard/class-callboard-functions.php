<?php
/**
 * Utilities and helper functions.
 *
 * @package Callboard
 */

/**
 * Callboard functions.
 */
class Callboard_Functions extends Callboard {
	/**
	 * Converts the $user_id => $status key/value pairs to a string (one per line) for backend use.
	 *
	 * @param  array|string $attendance The attendance array of $user_id => $status.
	 * @return string       The formatted string of key : value pairs.
	 */
	public static function format_attendance_array_for_textarea( $attendance ) {
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
	 * Validates a date string against a format.
	 *
	 * @param  string $datetime The datetime string.
	 * @param  string $format   The desired php Date format.
	 * @return boolean True if the date is properly formatted, false otherwise.
	 */
	public static function validate_date_string( $datetime, $format = Callboard::DATETIME_FORMAT ) {
		$date = DateTime::createFromFormat( $format, $datetime );
		return $date && $date->format( $format ) === $datetime;
	}

	/**
	 * Changes a date string to another format.
	 *
	 * @param string $datetime The datetime string to format.
	 * @param string $format   The format to which to convert the string.
	 * @return string The formatted datetime string.
	 */
	public static function format_date_string( $datetime, $format = Callboard::DATETIME_FORMAT ) {
		$date = new DateTime( $datetime );
		return $date->format( $format );
	}

	/**
	 * Sanitizes the values in an `attendance` meta field array.
	 *
	 * @param string $arr_string A multiline input string of user_id:status pairs.
	 * @return array The assembled array.
	 */
	public static function sanitize_attendance_string_to_array( $arr_string ) {
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
