<?php
/**
 * Callboard options page template.
 *
 * @uses $template_vars From Callboard_Loader::require_template()
 * @package Callboard
 *
 * @since 0.0.1
 */

?>

<div class="wrap">
	<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
	<form action="options.php" method="post">
		<?php
			settings_fields( $template_vars['options_group'] );
			do_settings_sections( $template_vars['options_group'] );
			submit_button( 'Save Settings' );
		?>
	</form>
</div>