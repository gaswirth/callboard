import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import {
	Grid,
	Stack,
	Skeleton,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	useMediaQuery,
	DialogActions,
	Box
} from '@mui/material';

import ViewHeading from 'components/ViewHeading';
import ShowTable from 'components/ShowTable';
import NextShowControl from 'components/NextShowControl';

import QRCode from 'components/QRCode';
import ShowNotes from 'components/ShowNotes';

import { useLatestShow } from 'hooks/queries/use-latest-show';
import { Print } from '@mui/icons-material';

export default function ShowControl() {
	const [{ loading: showLoading }, show] = useLatestShow();
	const [QROpen, setQROpen] = useState(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));

	const qrUrlBase = process.env.REACT_APP_FRONTEND_URL ? process.env.REACT_APP_FRONTEND_URL : '';

	const handleQROpen = () => setQROpen(true);
	const handleQRClose = () => setQROpen(false);

	const handlePrint = () => {
		alert('Boop!');
	};

	return (
		<Grid container spacing={5}>
			{show ? (
				<Grid item xs={6}>
					<Stack spacing={2}>
						<ViewHeading variant="h6">Current Show</ViewHeading>
						<>
							<Button onClick={handleQROpen} variant="contained">
								Sign-In Code
							</Button>
							<Dialog onClose={handleQRClose} open={QROpen} fullScreen={fullScreen}>
								<DialogTitle textAlign="center">Sign In</DialogTitle>
								<DialogContent>
									<DialogContentText textAlign="center">{show.datetime}</DialogContentText>
									<QRCode string={`${qrUrlBase}/signin/${show.slug}`} size={300} />
								</DialogContent>
								<DialogActions>
									<Button autoFocus variant="contained" onClick={handlePrint} endIcon={<Print />}>
										Print
									</Button>
									<Button autoFocus variant="contained" onClick={handleQRClose}>
										Close
									</Button>
								</DialogActions>
							</Dialog>
						</>
						{showLoading ? (
							<Skeleton>
								<Box />
							</Skeleton>
						) : (
							<>
								<ShowTable show={show} popoverDisabled showQRButton allowRosterEdit />
								<ShowNotes show={show} editable={true} />
							</>
						)}
					</Stack>
				</Grid>
			) : null}
			<Grid item xs={6}>
				<Stack spacing={2}>
					<ViewHeading variant="h6">Actions</ViewHeading>
					<NextShowControl />
					<Button variant="contained" onClick={() => alert('Google')}>
						Export Google Sheet
					</Button>
					<Button variant="contained" onClick={() => alert('Excel')}>
						Export Excel
					</Button>
					<Button variant="contained" onClick={() => alert('CSV')}>
						Export CSV
					</Button>
				</Stack>
			</Grid>
		</Grid>
	);
}
