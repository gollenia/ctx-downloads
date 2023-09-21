<?php

function ctx_image_endpoint($data)
{
	$response = wp_prepare_attachment_for_js($data['id']);

	if (empty($response)) {
		return new WP_REST_Response([], 400);
	}
    return new WP_REST_Response($response, 200);
}

add_action( 'rest_api_init', function () {
	register_rest_route( 'ctx/v2', '/file/(?P<id>\d+)', array(
		'methods' => 'GET',
		'callback' => 'ctx_image_endpoint',
		'permission_callback' => '__return_true'
) ); } );