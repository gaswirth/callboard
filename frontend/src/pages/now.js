import React, { useContext, useEffect, useState } from 'react';
import { Typography, Card } from '@mui/material';
import { Container } from '@mui/system';

import ProductionContext from '../context/ProductionContext';
import { isEmpty } from 'lodash';
import ShowTable from '../components/common/ShowTable';

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
			{show.notes ? (
				<Container sx={{ width: '100%', textAlign: 'center', p: 3, mt: 4 }} component={Card}>
					<Typography variant="body1" sx={{ fontWeight: '600' }}>
						Notes:
					</Typography>
					<Typography variant="body1" sx={{ mt: 1 }}>
						{show.notes}
					</Typography>
				</Container>
			) : null}
		</Container>
	);
}
