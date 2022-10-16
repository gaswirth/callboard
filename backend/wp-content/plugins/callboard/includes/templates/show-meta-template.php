<?php
/**
 * Meta template for the 'show' custom post type.
 *
 * @package Callboard
 *
 * @uses $datetime from the meta box callback function
 * @uses $notes from the meta box callback function
 * @uses $attendance from the meta box callback function.
 * 
 * @since 0.0.1
 */

?>

<style>
	.columns {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}
	.column {
		flex: 1 1 50%;
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

<p class="warning"><?php esc_html_e( 'WARNING: DO NOT EDIT THESE FIELDS MANUALLY.', 'callboard' ); ?></p>
<div class="columns">
	<div class="column">
		<label for="show_data[datetime]">
			<?php esc_html__( 'Date Format', 'callboard' ); ?><code><a href="https://www.php.net/manual/en/datetime.format.php" target="_blank"><?php echo esc_textarea( Callboard::DATETIME_FORMAT, 'callboard' ); ?></a></code>
		</label>
		<input type="text" id="show_data[datetime]" name="show_data[datetime]" placeholder="10/12/2022 08:00 PM" value="<?php echo esc_textarea( $datetime ); ?>">
	</div>
	<div class="column">
		<label for="show_data[notes]">Show Notes</label>
		<textarea id="show_data[notes]" name="show_data[notes]" class="widefat"><?php echo esc_textarea( $notes ); ?></textarea>
	</div>
	<div class="column">
		<label for="show_data[attendance]">Attendance</label>
		<p><?php esc_html_e( 'Format each pair on a separate line as', 'callboard' ); ?> <code>user_id : status</code></p>
		<p><?php esc_html_e( 'Allowed status values:', 'callboard' ); ?> <code>in, out, pd, vac</code></p>
		<textarea id="show_data[attendance]" name="show_data[attendance]" class="widefat"><?php esc_html_e( $attendance ); ?></textarea>
	</div>
</div>
