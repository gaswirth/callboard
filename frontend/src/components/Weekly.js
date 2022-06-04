import React, { useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import StatusIcon from './common/StatusIcon';

import ShowContext from '../context/ShowContext';

export default function Weekly() {
	const { show } = useContext(ShowContext);
	const showCount = 8;

	console.info(show.currentShow.attendance);

	if (!show) {
		return;
	}

	const rows = Object.keys(show.currentShow.attendance).map((key, i) => ({
		name: show.roster[key].name,
		attendance: show.currentShow.attendance[key],
	}));

	const currentShowStyles = { bgcolor: 'secondary.main', p: 1, borderRadius: 1 };

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
				<TableHead>
					<TableRow>
						<TableCell sx={{ py: 2, flexShrink: 1, flexGrow: 1 }}>Performer</TableCell>
						{Array.from({ length: showCount }).map((el, i) => {
							const showIndex = i + 1;
							return (
								<TableCell key={i + 1} sx={{ fontWeight: 400 }}>
									<Typography variant="button" sx={show.currentShow.id === showIndex ? { ...currentShowStyles } : {}}>
										{' '}
										Show {i + 1}
									</Typography>
								</TableCell>
							);
						})}
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							<TableCell sx={{ py: 2 }} scope="row">
								{row.name}
							</TableCell>
							{Array.from({ length: showCount }).map((el, i) => (
								<TableCell key={i} sx={{ py: 2 }} scope="row">
									<StatusIcon status={row.attendance[i]} />
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
