import { Button, Grid, Stack } from '@mui/material';
import React from 'react';
import ViewHeading from '../common/ViewHeading';
import Now from './Now';

export default function Admin() {
	return (
		<Grid container spacing={2}>
			<Grid item xs={4}>
				<ViewHeading variant="h6">Attendance</ViewHeading>
				<Now admin={true} />
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
				<ViewHeading variant="h6">Show Control</ViewHeading>
			</Grid>
		</Grid>
	);
}
