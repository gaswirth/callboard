<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
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
define( 'DB_NAME', 'callboard' );

/** MySQL database username */
define( 'DB_USER', 'callboard' );

/** MySQL database password */
define( 'DB_PASSWORD', 'callboard' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          '2ePR>b8$jW^*!n)1-{Z>c#N/)r({7f6Qex! qKAp&4/Y|&Yu<`40 zpZ_oUE_% ;' );
define( 'SECURE_AUTH_KEY',   '?oF)U^c+iJeRt-}qBYzK^;*ff9sWLXO5KPc-A9Z!V:[S:r2[Wz|2`XTkn^p(Jyk2' );
define( 'LOGGED_IN_KEY',     '-t[>6^+?m>0m$X>-*nJM]jJ05w|Kg/I**7c5:^r.#QB0+<h?D|Ep?N~,BYG|bN?P' );
define( 'NONCE_KEY',         ':%>/OZuCv$%J>)Qj#PKYG*xuEbYKIv./A!E3Q}(.WA08-!l./!FC@nQFYfYN1|Bg' );
define( 'AUTH_SALT',         'Uc%XMM2^#0K0,QBL__4;A@V9M__N=iQkV!06x3EM$$s=7E%os1>H5nP-z:5rgl%u' );
define( 'SECURE_AUTH_SALT',  'iTj,z3&a)j4dp_6Gi=[LycJ%Q^3A]Hk,D5Fshy`3^f=B2&_jxz=`+OEojzAD hlw' );
define( 'LOGGED_IN_SALT',    'Lb`TP~bX iTv]rg[s>=8_gc$%BuKW!cehABI^B^.*>d5~jkCak8q1V}-gzTQrBlt' );
define( 'NONCE_SALT',        ' RNOvv,H&4zCd[S893,*IMYm5x~|@MlL15~q[2So7q,5JhZ}`c:fGn5<Wo!i cXm' );
define( 'WP_CACHE_KEY_SALT', 'RI_|wl${w96SjFJ<p>PiYC9n[G8)8).3>x,?J;5ayT&5{i5xK.Qc4n4+P$mE7n*d' );

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

define( 'HEADLESS_FRONTEND_URL', 'http://localhost:3000/' );
define( 'PREVIEW_SECRET_TOKEN', '5&_)<J 4,(GF.~M+B??2O9Jh,NuU|>ED0;A UY12[/tvpJ[|[1O`tM#(6+0kV!Rm' );
define( 'GRAPHQL_JWT_AUTH_SECRET_KEY', ')/s*K30O{KfXnaiiYZC  `!+$nk7-J(-`9|`+RxFP|Bf+,^?f:ewxZP4D(btuSZn' );

define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
