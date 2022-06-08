import React, { useContext } from 'react';

import ProductionContext from '../context/ProductionContext';
import ShowTable from './common/ShowTable';

export default function Weekly() {
	const {
		production: { shows },
	} = useContext(ProductionContext);

	return <ShowTable showIds={Object.keys(shows)} />;
}
