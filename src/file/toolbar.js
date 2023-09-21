import { BlockControls, MediaReplaceFlow } from '@wordpress/block-editor';

import { ToolbarButton } from '@wordpress/components';

import { __ } from '@wordpress/i18n';

const ALLOWED_MEDIA_TYPES = [ 'image', 'document', 'audio', 'video' ];

const Toolbar = ( props ) => {
	const { attributes, setAttributes, onSelectMedia } = props;

	const { textAlign, fileId, fileUrl } = attributes;

	return (
		<>
			<BlockControls group="other">
				<MediaReplaceFlow mediaId={ fileId } mediaURL={ fileUrl } accept="*.*" onSelect={ onSelectMedia } name={ ! fileUrl ? __( 'Add File', 'ctx-blocks' ) : __( 'Replace' ) } />
				{ fileUrl && (
					<ToolbarButton
						icon="trash"
						title={ __( 'Remove Media', 'ctx-blocks' ) }
						onClick={ () => {
							setAttributes( {
								fileId: 0,
								fileUrl: '',
							} );
						} }
					/>
				) }
			</BlockControls>
		</>
	);
};

export default Toolbar;
