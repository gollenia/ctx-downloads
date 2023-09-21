import { InspectorControls, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { CheckboxControl, Icon, PanelBody, TextControl } from '@wordpress/components';
import { useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import './editor.scss';
import stringToSlug from './helpers';

export default function Edit( { attributes, setAttributes } ) {
	const { showSearch, showTableHeader, showFilter, showSize, showDate, showDescription, showCategory, showIcon, showFilename, categories } = attributes;

	const blockProps = useBlockProps( {} );

	const { children, ...innerBlockProps } = useInnerBlocksProps( blockProps, {
		allowedBlocks: [ 'ctx/file' ],
		template: [ [ 'ctx/file', { id: 1 } ] ],
	} );

	const newCategoryInput = useRef();

	const addCategory = ( event ) => {
		if ( event.keyCode !== 13 ) {
			return;
		}

		const id = stringToSlug( event.target.value );
		const newCategories = [ ...categories ];
		newCategories.push( { value: id, label: event.target.value } );
		setAttributes( { categories: newCategories } );
		newCategoryInput.current.value = '';
	};

	const removeCategory = ( id ) => {
		const newCategories = [ ...categories ];
		const index = newCategories.findIndex( ( category ) => category.value === id );
		newCategories.splice( index, 1 );
		setAttributes( { categories: newCategories } );
	};

	return (
		<>
			<InspectorControls key="setting">
				<PanelBody title={ __( 'Table Settings', 'ctx-downloads' ) }>
					<CheckboxControl label={ __( 'Show Size', 'ctx-downloads' ) } checked={ showSize } onChange={ ( value ) => setAttributes( { showSize: value } ) } />
					<CheckboxControl label={ __( 'Show Date', 'ctx-downloads' ) } checked={ showDate } onChange={ ( value ) => setAttributes( { showDate: value } ) } />
					<CheckboxControl label={ __( 'Show Description', 'ctx-downloads' ) } checked={ showDescription } onChange={ ( value ) => setAttributes( { showDescription: value } ) } />
					<CheckboxControl label={ __( 'Show Icon', 'ctx-downloads' ) } checked={ showIcon } onChange={ ( value ) => setAttributes( { showIcon: value } ) } />
					<CheckboxControl label={ __( 'Show Filename', 'ctx-downloads' ) } checked={ showFilename } onChange={ ( value ) => setAttributes( { showFilename: value } ) } />
					<CheckboxControl label={ __( 'Show Table Header', 'ctx-downloads' ) } checked={ showTableHeader } onChange={ ( value ) => setAttributes( { showTableHeader: value } ) } />
				</PanelBody>
				<PanelBody title={ __( 'Taxonomy', 'ctx-downloads' ) }>
					<div className="downloads-block__taxonomy">
						<div className="downloads-block__cats">
							{ categories.map( ( category ) => {
								return (
									<div className="downloads-block__cat" key={ category.value }>
										<span>{ category.label }</span>
										<button onClick={ () => removeCategory( category.value ) }>
											<Icon icon="no-alt"></Icon>
										</button>
									</div>
								);
							} ) }
						</div>
						<TextControl placeholder={ __( 'Add new category', 'ctx-downloads' ) } ref={ newCategoryInput } onKeyDown={ ( event ) => addCategory( event ) } onChange={ () => {} } />
					</div>
				</PanelBody>
				<PanelBody title={ __( 'Filter', 'ctx-downloads' ) }>
					<CheckboxControl label={ __( 'Show filter', 'ctx-downloads' ) } checked={ showFilter } onChange={ ( value ) => setAttributes( { showFilter: value } ) } />
					<CheckboxControl label={ __( 'Show Category', 'ctx-downloads' ) } checked={ showCategory } onChange={ ( value ) => setAttributes( { showCategory: value } ) } />
					<CheckboxControl label={ __( 'Show Search', 'ctx-downloads' ) } checked={ showSearch } onChange={ ( value ) => setAttributes( { showSearch: value } ) } />
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<div className="downloads-block__filter">
					{ showFilter && (
						<div className="downloads-block__categories">
							{ categories.map( ( category ) => {
								return <button key={ category.value }>{ category.label }</button>;
							} ) }
						</div>
					) }
					{ showSearch && (
						<div className="downloads-block__search">
							<input disabled type="search" placeholder={ __( 'Search', 'ctx-downloads' ) } />
						</div>
					) }
				</div>
				<div className="wp-block-table">
					<table { ...innerBlockProps }>
						{ showTableHeader && (
							<thead>
								<tr>
									{ showIcon && <th></th> }
									{ showFilename && <th>{ __( 'Filename', 'ctx-downloads' ) }</th> }
									{ showDescription && <th>{ __( 'Description', 'ctx-downloads' ) }</th> }
									{ showSize && <th>{ __( 'Size', 'ctx-downloads' ) }</th> }
									{ showDate && <th>{ __( 'Date', 'ctx-downloads' ) }</th> }
									{ showCategory && <th>{ __( 'Category', 'ctx-downloads' ) }</th> }
									<th></th>
								</tr>
							</thead>
						) }
						{ children }
					</table>
				</div>
			</div>
		</>
	);
}
