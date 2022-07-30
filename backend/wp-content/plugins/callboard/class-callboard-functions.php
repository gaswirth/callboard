<?php
/**
 * Utils.
 */

class Callboard_Functions extends Callboard {
	/**
	 * Converts the $user_id => $status key/value pairs to a string (one per line) for backend use.
	 *
	 * @param array $attendance The attendance array of $user_id => $status
	 * @return string The formatted string of key : value pairs.
	 */
	public static function format_attendance_array_for_textarea( $attendance ) {
		if ( ! is_array( $attendance ) ) {
			// TODO return WP_Error WP_REST_Error or some such?
			return;
		}

		$lines = array();
		foreach ( $attendance as $user_id => $status ) {
			$lines[] = sprintf( '%1$s : %2$s', $user_id, $status );
		}

		return implode( "\n", $lines );
	}

	/**
	 * Validates a date string given a format.
	 */
	public static function validate_date_string( $date, $format = CALLBOARD_DATETIME_FORMAT ) {
		$d = DateTime::createFromFormat( $format, $date );
		return $d && $d->format( $format ) === $date;
	}
}
