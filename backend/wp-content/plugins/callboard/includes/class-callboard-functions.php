<?php
/**
 * Utilities and helper functions.
 *
 * @package Callboard
 * @subpackage Callboard/includes
 *
 * @since 0.0.1
 */

/**
 * Callboard functions.
 *
 * @package Callboard
 * @subpackage Callboard/includes
 *
 * @since 0.0.1
 */
class Callboard_Functions extends Callboard {
	/**
	 * Validates a date string against a format.
	 *
	 * @param  string  $datetime The datetime string.
	 * @param  string  $format   The desired php Date format. Defaults to standard plugin format.
	 * @return boolean True if the date is properly formatted, false otherwise.
	 */
	public static function validate_date_string( $datetime, $format = Callboard::DATETIME_FORMAT ) {
		$date = DateTime::createFromFormat( $format, $datetime );
		return $date && $date->format( $format ) === $datetime;
	}

	/**
	 * Changes a date string to another format.
	 *
	 * @param  string $datetime The datetime string to format.
	 * @param  string $format   The format to which to convert the string.
	 * @return string The formatted datetime string.
	 */
	public static function format_date_string( $datetime, $format ) {
		$date = new DateTime( $datetime );
		return $date->format( $format );
	}

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
	 * Generates a random alphanumeric string with a specified length.
	 *
	 * @since 0.0.1
	 *
	 * @param  int    $length The desired resulting string length.
	 * @return string The random string.
	 */
	public static function generate_random_string( $length ) {
		$chars = '0123456789abcdefghijklmnopqrstuvwxyz-_';

		return substr( str_shuffle( $chars ), 0, $length );
	}
}
