import React, { useContext } from 'react';
import ShowTable from '../common/ShowTable';

import ProductionContext from '../../ProductionContext';

export default function Now() {
	const {
		production: { currentShowId },
	} = useContext(ProductionContext);

	return currentShowId ? <ShowTable showIds={[currentShowId]} /> : null;
}
