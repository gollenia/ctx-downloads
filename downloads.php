<?php
/**
 * Plugin Name:     CTX Downloads
 * Description:     Showng a searchable and filterable list of files for download
 * Version:         0.1.0
 * Author:          Thomas Gollenia
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     ctx-downloads
 *
 * @package         ctx
 */


require_once __DIR__ . '/lib/RestRoute.php';


/**
 * Initialize the plugin - we could tidy this up a bit
 *
 * @return void
 */
function ctx_downloads_block_init() {
	$dir = __DIR__;

	$index_asset_path = "$dir/build/index.asset.php";
	$frontend_asset_path = "$dir/build/index.asset.php";

	if ( ! file_exists( $index_asset_path ) || ! file_exists( $frontend_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "ctx/downloads" block first.'
		);
	}

	$index_js     = 'build/index.js';
	$frontend_js  = 'build/frontend.js';
	$index_asset = require( $index_asset_path );
	$frontend_asset = require( $frontend_asset_path );

	wp_register_script(
		'ctx-downloads-editor',
		plugins_url( $index_js, __FILE__ ),
		$index_asset['dependencies'],
		$index_asset['version']
	);
	wp_set_script_translations( 'ctx-downloads-editor', 'ctx-downloads', plugin_dir_path( __FILE__ ) . '/language' );

	wp_enqueue_script(
		'ctx-filelist-view',
		plugins_url( $frontend_js, __FILE__ ),
		$frontend_asset['dependencies'],
		$frontend_asset['version']
	);

	$editor_css = 'build/index.css';
	wp_register_style(
		'ctx-downloads-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'ctx-downloads-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type( 'ctx/filelist', array(
		"api_version" => 2,
		'editor_script' => 'ctx-downloads-editor',
		'editor_style'  => 'ctx-downloads-editor',
		'style'         => 'ctx-downloads-block',
	) );

	register_block_type( 'ctx/file', array(
		"api_version" => 2,
		'editor_script' => 'ctx-downloads-editor',
		'editor_style'  => 'ctx-downloads-editor',
		'style'         => 'ctx-downloads-block',
	) );
}
add_action( 'init', 'ctx_downloads_block_init' );
