import React from 'react';
import { Grid, Skeleton } from '@mui/material';

import ShowTable from 'components/common/ShowTable';

import { useRecentShows } from 'hooks/queries/use-recent-shows';

export default function History() {
	const { data: showData, loading: showLoading } = useRecentShows();

	return (
		<Grid item xs={12}>
			{showLoading ? (
				<Skeleton>
					<ShowTable />
				</Skeleton>
			) : (
				<ShowTable shows={showData.shows.nodes.slice(1)} />
			)}
		</Grid>
	);
}
