<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'gatsby_server' );

/** MySQL database username */
define( 'DB_USER', 'gatsby_server' );

/** MySQL database password */
define( 'DB_PASSWORD', 'gatsby_server' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         ']XkG<wrxkrPZ*<{w0]g,X#t5fb5H5N*Im]570wpe?LR2cY+c<>=YpN5f#>XgGTsv' );
define( 'SECURE_AUTH_KEY',  'l.ZY<_w5[>g/|,6SRdDGvDVg!Yv~;v8:Ww<3H/FiNlx8VZ$[Oey{48])FDhQi;ca' );
define( 'LOGGED_IN_KEY',    '.D<G<Y^5Osx)~}94@Uctk,)^X9O3HTM3cFn/3t{NL~8}w {y;*N1LF*p;;D)Isp@' );
define( 'NONCE_KEY',        'oJvr,)h*JYk@f<Rf%LY{xDOhQ=R#D,j6L]nn91e4`-5l q2jI/V@mwonko/h*sB]' );
define( 'AUTH_SALT',        '=`}[b+@!/2(zF=a^+! EyU}I;~1gP1xRIqDKap!&%83J]Eg#b.+Y:cwo9Pw0B&*.' );
define( 'SECURE_AUTH_SALT', '>+WBhRVym+[381}%rwzdi_lN)qa.73R1`{ B+ZJ#!Gu0sa>j~[C<.FfI?V?+~03I' );
define( 'LOGGED_IN_SALT',   'L993YH]xu`RL[_+DyX]$5+gqqf_%iTe(k`;qA`3PO?9>f,.A6k)u2yM}^ n_Vc&{' );
define( 'NONCE_SALT',       '-}C>FS0A=^u|V(:/@.B4PP9EIwukjk<WJOKg,R-qtJGkHU(]</M>rl=~JdIPl%w`' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', true );
define('WP_DEBUG_LOG', true);

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
