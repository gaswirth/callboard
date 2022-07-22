import React, { useContext } from 'react';
import { Button, ButtonGroup, Grid, IconButton, Stack, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ViewHeading from '../common/ViewHeading';
import Now from './Now';

import ProductionContext from '../../ProductionContext';
import { Box } from '@mui/system';

export default function Admin() {
	const {
		production: { currentShowId, shows },
	} = useContext(ProductionContext);

	return (
		<Grid container spacing={2}>
			<Grid item xs={4}>
				<ViewHeading variant="h6">Attendance</ViewHeading>
				{/* TODO Set actual user value */}
				<Now userIsAdmin={true} />
			</Grid>
			<Grid item xs={4}>
				<ViewHeading variant="h6">Export</ViewHeading>
				<Stack spacing={2}>
					<Button fullWidth={true} variant="contained">
						Google Sheets
					</Button>
					<Button fullWidth={true} variant="contained">
						Excel
					</Button>
					<Button fullWidth={true} variant="contained">
						CSV
					</Button>
				</Stack>
			</Grid>
			<Grid item xs={4}>
				<ViewHeading variant="h6">Current Show</ViewHeading>
				{shows ? (
					<ButtonGroup sx={{ alignItems: 'center', width: '100%' }}>
						<IconButton sx={{ flexGrow: 1 }} variant="contained">
							<ArrowBackIosNewIcon />
						</IconButton>
						<Box sx={{ flexGrow: 1, textAlign: 'center' }}>
							<Typography variant="body1" sx={{ fontWeight: 600 }}>
								{shows[currentShowId].label}
							</Typography>
						</Box>
						<IconButton sx={{ flexGrow: 1 }}>
							<ArrowForwardIosIcon />
						</IconButton>
					</ButtonGroup>
				) : null}
			</Grid>
		</Grid>
	);
}
