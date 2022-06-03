<?php
/**
 * Plugin Name: Test Shortcode
 */

add_shortcode(
	'test',
	function ( $atts, $content ) {
		return '<strong><em>' . $content . '</em></strong>';
	}
);
