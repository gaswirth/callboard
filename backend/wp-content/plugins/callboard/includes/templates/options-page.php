<?php
/**
 * Callboard options page template.
 *
 * @uses $option_group of the settings to show.
 * @package Callboard
 *
 * @since 0.0.1
 */

?>

<div class="wrap">
	<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
	<form action="options.php" method="post">
		<?php
			settings_fields( $options_group );
			do_settings_sections( $options_group );
			submit_button( 'Save Settings' );
		?>
	</form>
</div>