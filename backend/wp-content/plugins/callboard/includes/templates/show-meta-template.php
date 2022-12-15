<?php
	/**
	 * Meta template for the 'show' custom post type.
	 *
	 * @uses $template_vars From Callboard_Loader::require_template()
	 * @package Callboard
	 *
	 * @since 0.0.1
	 */

?>

<style>
	.columns {
		display: flex;
		justify-content: space-evenly;
		flex-wrap: wrap;
	}
	.column {
		flex: 1;
		padding: 0 1%;
		margin: 1em 0;
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

<p class="warning"><?php esc_html_e( 'WARNING: DO NOT EDIT THESE FIELDS MANUALLY.', 'callboard' );?></p>
<div class="columns">
	<div class="column">
		<label for="show_data[notes]">Show Notes</label>
		<textarea id="show_data[notes]" name="show_data[notes]" class="widefat" rows=4><?php echo esc_textarea( $template_vars['notes'] ); ?></textarea>
	</div>
	<div class="column">
		<label for="show_data[attendance]">Attendance</label>
		<p><?php esc_html_e( 'Format each pair on a separate line as', 'callboard' );?> <code>user_id : status</code></p>
		<p><?php esc_html_e( 'Allowed status values:', 'callboard' );?> <code>in, out, pd, vac</code></p>
		<textarea id="show_data[attendance]" name="show_data[attendance]" class="widefat" rows="4"><?php esc_html_e( $template_vars['attendance'] );?></textarea>
	</div>
</div>
