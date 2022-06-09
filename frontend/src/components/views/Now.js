import React, { useContext, useEffect, useState } from 'react';
import { Container } from '@mui/system';
import { isEmpty } from 'lodash';
import ShowTable from '../common/ShowTable';
import Note from '../common/Note';

import ProductionContext from '../../ProductionContext';

export default function Now() {
	const { production } = useContext(ProductionContext);
	const { currentShow, shows } = production;
	const [show, setShow] = useState({});

	useEffect(() => {
		if (isEmpty(shows)) return;

		setShow(shows[currentShow]);
	}, [currentShow, shows]);

	return (
		<Container sx={{ mt: 2, width: 400 }}>
			<ShowTable showIds={[currentShow]} />
			{show.notes ? <Note title="Notes:">{show.notes}</Note> : null}
		</Container>
	);
}
