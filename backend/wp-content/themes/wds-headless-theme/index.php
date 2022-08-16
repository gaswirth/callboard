<?php
/**
 * Redirect theme requests to frontend.
 *
 * @package wds-headless-theme
 *
 * @author WebDevStudios
 *
 * @since 1.0.0
 */

header( 'Location:' . get_option( 'callboard_frontend_url' ), true, 303 );
