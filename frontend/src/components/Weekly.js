import React, { useContext } from 'react';

import ProductionContext from '..//ProductionContext';
import ShowTable from './common/ShowTable';

export default function Weekly() {
	const {
		production: { shows },
	} = useContext(ProductionContext);

	// TODO This currently sends all shows.
	return <ShowTable showIds={Object.keys(shows)} />;
}
