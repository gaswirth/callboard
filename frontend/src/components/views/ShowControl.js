import React, { useState } from 'react';
import {
	Container,
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
import { Print } from '@mui/icons-material';

import ViewHeading from 'components/ViewHeading';
import ShowTable from 'components/ShowTable';
import NewShow from 'components/NewShow';
import QRCode from 'components/QRCode';

import { useLatestShow } from 'hooks/queries/use-latest-show';
import { useSigninURL } from 'hooks/hooks';

export default function ShowControl() {
	const [{ loading: showLoading }, show] = useLatestShow();
	const [QROpen, setQROpen] = useState(false);
	const [actionsOpen, setExportOpen] = useState(false);

	const signinURL = useSigninURL(show?.slug);

	const handleQROpen = () => setQROpen(true);
	const handleQRClose = () => setQROpen(false);
	const handleExportOpen = () => setExportOpen(true);
	const handleExportClose = () => setExportOpen(false);

	const handlePrint = () => {
		alert('Le print, she goes!');
	};

	return (
		<Container maxWidth="sm">
			<Stack spacing={2}>
				{show ? (
					<>
						<ViewHeading variant="h6">Current Show</ViewHeading>
						<Stack direction="row" justifyContent="space-between">
							<Button onClick={handleQROpen} variant="contained">
								QR Code
							</Button>
							<Button onClick={handleExportOpen} variant="contained">
								Export
							</Button>
						</Stack>

						<Dialog onClose={handleQRClose} open={QROpen}>
							<DialogTitle textAlign="center">Sign-In</DialogTitle>
							<DialogContent>
								<DialogContentText textAlign="center">{show.datetime}</DialogContentText>
								<QRCode string={signinURL} size={300} />
							</DialogContent>
							<DialogActions>
								<Button autoFocus variant="contained" onClick={handlePrint} endIcon={<Print />}>
									{/* TODO Print! */}
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
						{showLoading ? (
							<Skeleton>
								<Box />
							</Skeleton>
						) : (
							<ShowTable show={show} allowStatusChanges allowAddCompanyMember />
						)}
					</>
				) : null}
				<NewShow />
			</Stack>
		</Container>
	);
}
