import React from 'react';
import { Paper, Grid, Stack, Skeleton } from '@mui/material';

import ViewHeading from 'components/common/ViewHeading';
import ShowTable from 'components/common/ShowTable';
import NextShowControl from 'components/common/NextShowControl';

import { useRecentShows } from 'hooks/queries/use-recent-shows';
import QRCode from 'components/common/QRCode';
import ShowNotes from 'components/common/ShowNotes';

export default function ShowControl() {
	const { data: showData, loading: showLoading } = useRecentShows();

	return (
		<Grid container spacing={5}>
			{showData?.shows.nodes[0] ? (
				<Grid item xs={8}>
					<Stack spacing={2}>
						<ViewHeading variant="h6">Current Show</ViewHeading>
						{showLoading ? (
							<Skeleton>
								<ShowTable />
							</Skeleton>
						) : (
							<>
								<ShowTable shows={[showData.shows.nodes[0]]} qrcode={true} />
								<ShowNotes show={showData.shows.nodes[0]} editable={true} />
							</>
						)}
					</Stack>
				</Grid>
			) : null}
			<Grid item xs={4}>
				<Stack spacing={2}>
					<ViewHeading variant="h6">QR Sign-in</ViewHeading>
					<Paper sx={{ py: 3, px: 1, mb: 4 }}>
						<QRCode />
					</Paper>
					<NextShowControl />
				</Stack>
			</Grid>
		</Grid>
	);
}
