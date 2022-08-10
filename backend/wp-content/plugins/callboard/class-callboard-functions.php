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
	 * @param  string $date   The datetime string.
	 * @param  string $format The desired php Date format.
	 * @return boolean True if the date is properly formatted, false otherwise.
	 */
	public static function validate_date_string( $date, $format = CALLBOARD_DATETIME_FORMAT ) {
		$d = DateTime::createFromFormat( $format, $date );
		return $d && $d->format( $format ) === $date;
	}
}
