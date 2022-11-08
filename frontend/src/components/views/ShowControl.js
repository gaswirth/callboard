import React, { useState } from 'react';
import {
	Grid,
	Stack,
	Skeleton,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Box,
} from '@mui/material';

import ViewHeading from 'components/ViewHeading';
import ShowTable from 'components/ShowTable';
import NextShowControl from 'components/NextShowControl';

import QRCode from 'components/QRCode';

import { useLatestShow } from 'hooks/queries/use-latest-show';
import { Print } from '@mui/icons-material';

export default function ShowControl() {
	const [{ loading: showLoading }, show] = useLatestShow();
	const [QROpen, setQROpen] = useState(false);
	const [actionsOpen, setExportOpen] = useState(false);

	const qrUrlBase = process.env.REACT_APP_FRONTEND_URL ? process.env.REACT_APP_FRONTEND_URL : '';

	const handleQROpen = () => setQROpen(true);
	const handleQRClose = () => setQROpen(false);
	const handleExportOpen = () => setExportOpen(true);
	const handleExportClose = () => setExportOpen(false);

	const handlePrint = () => {
		alert('Le print, she goes!');
	};

	return show ? (
		<Grid>
			<Stack spacing={2}>
				<ViewHeading variant="h6">Current Show</ViewHeading>
				<>
					<Stack direction="row" justifyContent="space-between">
						<Button onClick={handleQROpen} variant="contained">
							QR Code
						</Button>
						<Button onClick={handleExportOpen} variant="contained">
							Export
						</Button>
					</Stack>

					<Dialog onClose={handleQRClose} open={QROpen}>
						<DialogTitle textAlign="center">Export</DialogTitle>
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

					<Dialog onClose={handleExportClose} open={actionsOpen}>
						<DialogTitle textAlign="center">Export</DialogTitle>
						<DialogContent>
							<DialogContentText>
								<Stack spacing={2}>
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
							</DialogContentText>
						</DialogContent>
					</Dialog>
				</>
				{showLoading ? (
					<Skeleton>
						<Box />
					</Skeleton>
				) : (
					<ShowTable show={show} popoverDisabled showQRButton allowRosterEdit allowStatusChanges />
				)}
				<NextShowControl />
			</Stack>
		</Grid>
	) : null;
}
