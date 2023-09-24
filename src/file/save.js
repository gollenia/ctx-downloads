import { useBlockProps } from '@wordpress/block-editor';
import { Icon } from '@wordpress/icons';
import icons from './icons';

export default function save( { attributes } ) {
	const { parentData, categoryLabel, categoryValue, fileId, fileName, fileSize, fileDescription, fileDate, fileType, fileUrl } = attributes;

	const icon = icons[ fileType ] ?? '';

	return (
		<>
			<tr { ...useBlockProps.save() } data-category={ categoryValue } data-filename={ fileName } data-description={ fileDescription }>
				{ parentData[ 'ctx/showIcon' ] && (
					<td>
						<Icon icon={ icon }></Icon>
					</td>
				) }
				{ parentData[ 'ctx/showFilename' ] && (
					<td>
						<a href={ fileUrl } target="_blank">
							{ fileName }
						</a>
					</td>
				) }
				{ parentData[ 'ctx/showDescription' ] && <td>{ fileDescription }</td> }
				{ parentData[ 'ctx/showSize' ] && <td>{ fileSize }</td> }
				{ parentData[ 'ctx/showDate' ] && <td>{ fileDate }</td> }
				{ parentData[ 'ctx/showCategory' ] && <td>{ categoryLabel }</td> }
				<td>
					<a href={ fileUrl } target="_blank">
						<Icon icon={ icons.download }></Icon>
					</a>
				</td>
			</tr>
		</>
	);
}
