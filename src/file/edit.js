import apiFetch from '@wordpress/api-fetch';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Icon, PanelBody, SelectControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import icons from './icons';
import Toolbar from './toolbar';

import './editor.scss';

export default function Edit( { attributes, setAttributes, context } ) {
	const { categoryLabel, categoryValue, parentData, fileId, fileName, fileSize, fileDescription, fileDate, fileType, fileUrl } = attributes;

	const blockProps = useBlockProps( {
		className: `downloads-block`,
	} );

	const categories = context[ 'ctx/categories' ];

	setAttributes( { parentData: context } );

	const onSelectMedia = ( media ) => {
		if ( ! media || ! media.url ) {
			setAttributes( { fileName: undefined, fileSize: undefined, fileDescription: undefined, fileDate: undefined, fileType: undefined, fileUrl: undefined } );
			return;
		}

		setAttributes( {
			fileId: media.id,
		} );
	};

	useEffect( () => {
		if ( ! fileId ) {
			return;
		}
		apiFetch( { path: '/ctx/v2/file/' + fileId } ).then( ( posts ) => {
			setAttributes( {
				fileName: posts.filename ?? '',
				fileSize: posts.filesizeHumanReadable ?? '',
				fileDescription: posts.caption ?? '',
				fileDate: posts.dateFormatted ?? '',
				fileType: posts.subtype ?? '',
				fileUrl: posts.url ?? '',
			} );
		} );
	}, [ fileId ] );

	const icon = icons[ fileType ] ?? '';

	const setCategory = ( value ) => {
		const label = categories.find( ( category ) => value == category.value ).label;
		setAttributes( { categoryValue: value } );
		setAttributes( { categoryLabel: categories.find( ( category ) => value == category.value ).label } );
	};

	return (
		<>
			<InspectorControls key="setting">
				<PanelBody title={ __( 'Allgemeine Einstellungen', 'icon' ) }>
					<SelectControl label={ __( 'Kategorie', 'icon' ) } value={ categoryValue } options={ categories } onChange={ ( value ) => setCategory( value ) } />
				</PanelBody>
			</InspectorControls>
			<Toolbar { ...{ attributes, setAttributes, context, onSelectMedia } } />
			<tr { ...blockProps } data-category={ categoryValue }>
				{ context[ 'ctx/showIcon' ] && icon && <Icon icon={ icon }></Icon> }
				{ context[ 'ctx/showFilename' ] && <td>{ fileName }</td> }
				{ context[ 'ctx/showDescription' ] && <td>{ fileDescription }</td> }
				{ context[ 'ctx/showSize' ] && <td>{ fileSize }</td> }
				{ context[ 'ctx/showDate' ] && <td>{ fileDate }</td> }
				{ context[ 'ctx/showCategory' ] && <td>{ categoryLabel }</td> }
				<td>
					<a href={ fileUrl }>
						<Icon icon={ icons.download }></Icon>
					</a>
				</td>
			</tr>
		</>
	);
}
