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
						{show ? (
							<>
								<Button onClick={handleQROpen} variant="contained">
									Sign-In Code
								</Button>
								<Dialog onClose={handleQRClose} open={QROpen} fullScreen={fullScreen}>
									<DialogTitle textAlign="center">Sign In</DialogTitle>
									<DialogContent>
										<DialogContentText>{show.datetime}</DialogContentText>
										<QRCode string={show.slug} />
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
						) : null}
						{showLoading ? (
							<Skeleton>
								<ShowTable />
							</Skeleton>
						) : (
							<>
								<ShowTable shows={[show]} popoverDisabled showQRButton />
								<ShowNotes show={show} editable={true} />
							</>
						)}
					</Stack>
				</Grid>
			) : null}
			<Grid item xs={6}>
				<Stack spacing={2}>
					<NextShowControl />
				</Stack>
			</Grid>
		</Grid>
	);
}
