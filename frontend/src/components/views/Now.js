import React, { useContext } from 'react';
import ShowTable from '../common/ShowTable';
import Note from '../common/Note';

import ProductionContext from '../../ProductionContext';
import { useShow } from '../../lib/hooks';

export default function Now() {
	const {
		production: { currentShowId, shows },
	} = useContext(ProductionContext);

	const currentShow = useShow(shows, currentShowId);

	return currentShowId ? (
		<>
			{currentShowId ? <ShowTable showIds={[currentShowId]} buttonsEnabled={true} /> : null}
			<Note>{currentShow && currentShow.notes ? currentShow.notes : 'No notes.'}</Note>
		</>
	) : null;
}
