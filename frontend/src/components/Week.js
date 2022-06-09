import React, { useContext } from 'react';

import ProductionContext from '../ProductionContext';
import ShowTable from './common/ShowTable';

export default function Week() {
	const {
		production: { shows },
	} = useContext(ProductionContext);

	return <ShowTable showIds={Object.keys(shows)} />;
}
