import React, { useContext, useEffect, useState } from 'react';
import { Typography, Paper, Card } from '@mui/material';
import { Box, Container } from '@mui/system';

import ProductionContext from '../context/ProductionContext';
import { isEmpty } from 'lodash';

export default function Now() {
	const { production } = useContext(ProductionContext);
	const { currentShow, shows } = production;
	const [show, setShow] = useState({});

	useEffect(() => {
		if (isEmpty(shows)) return;

		setShow(shows[currentShow]);
	}, [currentShow, shows]);

	// const rows = Object.keys(production.roster).map((performerId) => {
	// 	return {
	// 		name: production.roster[performerId].name,
	// 		attendance: production.shows[currentShow].attendance[performerId],
	// 	};
	// });

	return (
		// TODO Fix according to data structure changes in 'Weekly' (or redo this all together)
		<Container>
			<Box
				sx={{ mt: 2, p: 4, textAlign: 'center', backgroundColor: 'warning.main', color: 'primary.lightgray' }}
				component={Paper}
			>
				(One-show table here)
			</Box>
			{show.notes ? (
				<Box sx={{ width: '100%', textAlign: 'center', p: 3, mt: 4 }} component={Card}>
					<Typography variant="body1" sx={{ fontWeight: '600' }}>
						Notes:
					</Typography>
					<Typography variant="body1" sx={{ mt: 1 }}>
						{show.notes}
					</Typography>
				</Box>
			) : null}
		</Container>
	);
}
