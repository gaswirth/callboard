import React from 'react';
import { Grid, Skeleton } from '@mui/material';

import ShowTable from 'components/ShowTable';

import { useRecentShows } from 'hooks/queries/use-recent-shows';

export default function History() {
	const [{ loading: showLoading }, shows] = useRecentShows();

	// TODO Date control

	return (
		<Grid item xs={12}>
			{showLoading ? (
				<Skeleton>
					<ShowTable />
				</Skeleton>
			) : (
				<ShowTable shows={shows.slice(1)} />
			)}
		</Grid>
	);
}
