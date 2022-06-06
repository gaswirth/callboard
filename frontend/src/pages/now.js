import React, { useContext, useEffect, useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	Paper,
	Card,
} from '@mui/material';
import { Box, Container } from '@mui/system';
import StatusIcon from '../components/common/StatusIcon';
import PendingBox from '../components/common/PendingBox';

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

	const rows = Object.keys(production.roster).map((performerId) => {
		return {
			name: production.roster[performerId].name,
			attendance: production.shows[currentShow].attendance[performerId],
		};
	});

	return (
		<Container>
			<TableContainer component={Paper} sx={{ mt: 4, mx: 'auto' }}>
				<Table size="small" aria-label="a weekly attendance table">
					<TableHead>
						<TableRow>
							<TableCell sx={{ py: 2 }} align="right">
								Performer
							</TableCell>
							<TableCell sx={{ py: 2 }} align="center">
								This Show
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell sx={{ py: 2 }} align="right" scope="row">
									{row.name}
								</TableCell>
								<TableCell sx={{ py: 2 }} align="center" scope="row">
									{row.attendance ? <StatusIcon status={row.attendance} /> : <PendingBox />}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
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
