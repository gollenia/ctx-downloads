/**
 * Internal dependencies
 */
import metadata from './block.json';
import Edit from './edit';
import './editor.scss';
import icon from './icon';
import Save from './save';
import './style.scss';

/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';

const { name, title, description } = metadata;

const settings = {
	...metadata,
	title: __( title, 'ctx-blocks' ),
	description: __( description, 'ctx-blocks' ),
	icon,
	edit: Edit,
	save: Save,
};

export { name, settings };
