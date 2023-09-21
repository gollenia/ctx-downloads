const stringToSlug = function ( str ) {
	str = str.replace( /^\s+|\s+$/g, '' ); // trim
	str = str.toLowerCase();

	// remove accents, swap ñ for n, etc
	const from = 'ßàáäâèéëêìíïîòóöôùúüûñçěščřžýúůďťň·/_,:;';
	const to = 'saaaaeeeeiiiioooouuuuncescrzyuudtn------';

	for ( let i = 0, l = from.length; i < l; i++ ) {
		str = str.replace( new RegExp( from.charAt( i ), 'g' ), to.charAt( i ) );
	}

	str = str
		.replace( '.', '-' ) // replace a dot by a dash
		.replace( /[^a-z0-9 -]/g, '' ) // remove invalid chars
		.replace( /\s+/g, '-' ) // collapse whitespace and replace by a dash
		.replace( /-+/g, '-' ) // collapse dashes
		.replace( /\//g, '' ); // collapse all forward-slashes

	return str;
};

export default stringToSlug;
