import React from 'react';
import { Paper, Grid, Stack, Skeleton } from '@mui/material';

import ViewHeading from 'components/common/ViewHeading';
import ShowTable from 'components/common/ShowTable';
import AdminActions from 'components/common/AdminActions';

import { useRecentShows } from 'hooks/queries/use-recent-shows';
import QRCode from 'components/common/QRCode';
import ShowNotes from 'components/common/ShowNotes';

export default function ShowControl() {
	const { data: showData, loading: showLoading } = useRecentShows();

	return (
		<Grid container spacing={5}>
			{showData?.shows.nodes[1] ? (
				<Grid item xs={4}>
					<Stack spacing={2}>
						<ViewHeading variant="h6">Sign-in QR</ViewHeading>
						<Paper>
							<QRCode />
						</Paper>
					</Stack>
				</Grid>
			) : null}
			{showData?.shows.nodes[0] ? (
				<Grid item xs={4}>
					<Stack spacing={2}>
						<ViewHeading variant="h6">Current Show</ViewHeading>
						{showLoading ? (
							<Skeleton>
								<ShowTable />
							</Skeleton>
						) : (
							// TODO: add "edit Notes" field'
							<>
								<ShowTable shows={[showData.shows.nodes[0]]} />
								<ShowNotes show={showData.shows.nodes[0]} editable={true} />
							</>
						)}
					</Stack>
				</Grid>
			) : null}
			<Grid item xs={4}>
				<AdminActions />
			</Grid>
			<Grid item xs={12}>
				{showLoading ? (
					<Skeleton>
						<ShowTable />
					</Skeleton>
				) : (
					<ShowTable shows={showData.shows.nodes.slice(1)} />
				)}
			</Grid>
		</Grid>
	);
}
