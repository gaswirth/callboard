import React, { useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import StatusIcon from '../components/common/StatusIcon';

import ProductionContext from '../context/ProductionContext';
import { Box, Container } from '@mui/system';

export default function Now() {
	const { production } = useContext(ProductionContext);
	const { currentShow } = production;

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
									{row.attendance ? (
										<StatusIcon status={row.attendance} />
									) : (
										<Box
											sx={{
												height: '40px',
												width: '40px',
												mx: 'auto',
												backgroundColor: 'secondary.main',
												opacity: 0.5,
												borderRadius: 1,
											}}
										></Box>
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
}
