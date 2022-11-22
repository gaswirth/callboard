import React from 'react';
import { Box, Grid, Skeleton } from '@mui/material';

import ShowTable from 'components/ShowTable';

import { useRecentShows } from 'hooks/queries/use-recent-shows';
import { useCurrentShowId } from 'hooks/queries/use-current-show-id';

export default function History() {
	const currentShowId = useCurrentShowId();
	const [{ loading: showLoading }, shows] = useRecentShows(8, currentShowId);

	// MAYBE Date control or lazy load?

	return (
		<Grid container spacing={5}>
			{showLoading ? (
				<Skeleton>
					<Box />
				</Skeleton>
			) : (
				shows.map((show) => {
					return (
						<Grid key={show.id} item xs={12} sm={6}>
							<ShowTable show={show} />
						</Grid>
					);
				})
			)}
		</Grid>
	);
}
