import React from 'react';
import { Box, Grid, Skeleton } from '@mui/material';

import ShowTable from 'components/ShowTable';

import { useRecentShows } from 'hooks/queries/use-recent-shows';

export default function History() {
	const [{ loading: showLoading }, shows] = useRecentShows(8);

	// TODO Date control

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
