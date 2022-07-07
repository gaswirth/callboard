import React, { useContext } from 'react';

import ProductionContext from '../../ProductionContext';
import ShowTable from '../common/ShowTable';

// TODO Get a range of show IDs of shows with a `datetime` parameter occuring this week.

export default function Week() {
	const {
		production: { shows },
	} = useContext(ProductionContext);

	return <ShowTable showIds={Object.keys(shows)} />;
}
