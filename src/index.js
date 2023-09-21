import { registerBlockType } from '@wordpress/blocks';
import './style.scss';

import * as file from './file';
import * as filelist from './filelist';

const registerBlock = ( block ) => {
	if ( ! block ) return;
	const { name, settings } = block;
	registerBlockType( name, settings );
};

export const registerBlocks = () => {
	[ file, filelist ].forEach( registerBlock );
};

registerBlocks();
