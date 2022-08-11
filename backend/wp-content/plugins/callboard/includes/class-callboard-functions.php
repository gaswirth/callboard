<?php
/**
 * Utilities and helper functions.
 *
 * @package Callboard
 * @subpackage Callboard/includes
 *
 * @since 0.0.2
 */

/**
 * Callboard functions.
 *
 * @package Callboard
 * @subpackage Callboard/includes
 *
 * @since 0.0.2
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
	 * @param  string $format   The format to which to convert the string. Defaults to standard plugin format.
	 * @return string The formatted datetime string.
	 */
	public static function format_date_string( $datetime, $format = Callboard::DATETIME_FORMAT ) {
		$date = new DateTime( $datetime );
		return $date->format( $format );
	}
}
