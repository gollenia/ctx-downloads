/******
 * Frontend JS
 * Simple frontend JS withoput the glamour of React
 *
 * @TODO: Allow multiple downloads blocks on a page
 */
const ctxFilter = () => {
	categoryButtons = document.querySelectorAll( '.category-button' );
	categoryButtons.forEach( function ( button ) {
		button.addEventListener( 'click', function ( event ) {
			event.preventDefault();
			const category = event.target.dataset.category;

			if ( category === 'all' ) {
				const table = document.querySelector( '.downloads-table' );
				const rows = table.querySelectorAll( 'tr' );
				rows.forEach( function ( row ) {
					row.classList.remove( 'hidden' );
				} );
				return;
			}

			const table = document.querySelector( '.downloads-table' );
			const rows = table.querySelectorAll( 'tr' );
			rows.forEach( function ( row ) {
				if ( row.classList.contains( 'header' ) ) return;
				if ( row.dataset.category === category ) {
					row.classList.remove( 'hidden' );
					return;
				}

				row.classList.add( 'hidden' );
			} );
		} );
	} );
};

const ctxSearch = () => {
	const search = document.querySelector( '.downloads-block__search input' );
	search.addEventListener( 'keyup', function ( event ) {
		event.preventDefault();
		console.log( event.keyCode );
		if ( event.key == 'Escape' ) {
			console.log( 'esc' );
			search.value = '';
		}

		let searchValue = event.target.value.toLowerCase();
		if ( searchValue.length < 3 ) searchValue = '';

		const table = document.querySelector( '.downloads-table' );
		const rows = table.querySelectorAll( 'tr' );
		rows.forEach( function ( row ) {
			if ( row.classList.contains( 'header' ) ) return;
			if ( row.dataset.filename.toLowerCase().includes( searchValue ) ) {
				row.classList.remove( 'hidden-by-search' );
				return;
			}

			row.classList.add( 'hidden-by-search' );
		} );
	} );
};

addEventListener( 'DOMContentLoaded', ctxFilter );
addEventListener( 'DOMContentLoaded', ctxSearch );
