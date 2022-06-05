import React, { useContext } from 'react';
import { Box } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import StatusIcon from './common/StatusIcon';
import PendingBox from './common/PendingBox';

import ProductionContext from '../context/ProductionContext';

export default function Weekly() {
	const {
		production: { roster, shows, currentShow },
	} = useContext(ProductionContext);
	const showCount = 8;

	const rows = Object.keys(roster).map((performerId) => {
		return {
			name: roster[performerId].name,
			attendance: Object.keys(shows).map((showId) => {
				return shows[showId].attendance[performerId];
			}),
		};
	});

	const showStyles = (showIndex) => {
		return currentShow === showIndex ? { bgcolor: 'secondary.main', p: 1, borderRadius: 1 } : {};
	};

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} size="small" aria-label="a weekly attendance table">
				<TableHead>
					<TableRow>
						<TableCell
							sx={{
								flexShrink: 1,
								flexGrow: 1,
								textAlign: 'right',
								borderRightWidth: 1,
								borderRightColor: 'primary.gray',
								borderRightStyle: 'solid',
								textTransform: 'uppercase',
							}}
						>
							<Typography variant="button">Performer</Typography>
						</TableCell>
						{Array.from({ length: showCount }).map((el, i) => {
							const showIndex = i + 1;
							return (
								<TableCell key={i + 1}>
									<Typography variant="button" sx={{ ...showStyles(showIndex) }}>
										Show {i + 1}
									</Typography>
								</TableCell>
							);
						})}
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.name}>
							<TableCell
								sx={{
									pr: 3,
									pl: 0,
									borderRightWidth: 1,
									borderRightColor: 'primary.gray',
									borderRightStyle: 'solid',
									textAlign: 'right',
								}}
								scope="row"
							>
								{row.name}
							</TableCell>
							{Array.from({ length: showCount }).map((el, i) => (
								<TableCell key={i} scope="row">
									{row.attendance[i] ? (
										<Box sx={{ p: 1, lineHeight: 1 }}>
											<StatusIcon status={row.attendance[i]} />
										</Box>
									) : (
										<PendingBox />
									)}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
