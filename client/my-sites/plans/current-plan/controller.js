/**
 * External Dependencies
 */
import React from 'react';

/**
 * Internal Dependencies
 */
import { renderWithReduxStore } from 'lib/react-helpers';
import CurrentPlan from './';

export default function( context ) {
	renderWithReduxStore(
		React.createElement( CurrentPlan, {
			context: context
		} ),
		document.getElementById( 'primary' ),
		context.store
	);
}
