import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import './style.scss';

export default function save( { attributes } ) {
	const { categories, showTableHeader, showFilter, showSize, showDate, showDescription, showCategory, showIcon, showFilename, showSearch } = attributes;

	const blockProps = useBlockProps.save();

	const { children, innerBlockProps } = useInnerBlocksProps.save();
	return (
		<div { ...blockProps }>
			{ showFilter && (
				<div className="downloads-block__filter">
					{ showFilter && (
						<div className="downloads-block__categories">
							<button data-category="all" className="category-button active">
								{ __( 'All', 'ctx-downloads' ) }
							</button>
							{ categories.map( ( category ) => {
								return (
									<button data-category={ category.value } className="category-button" key={ category.value }>
										{ category.label }
									</button>
								);
							} ) }
						</div>
					) }
					{ showSearch && (
						<div className="downloads-block__search">
							<input type="search" placeholder={ __( 'Search', 'ctx-downloads' ) } />
						</div>
					) }
				</div>
			) }
			<div class="downloads-table wp-block-table">
				<table { ...innerBlockProps } sortable>
					{ showTableHeader && (
						<thead>
							<tr className="header">
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
	);
}
