import React from 'react';
import { Container, Grid, CircularProgress } from '@mui/material';

import ShowTable from '@/components/ShowTable';

import { useRecentShows } from '@/hooks/queries/use-recent-shows';
import { useCurrentShowId } from '@/hooks/queries/use-current-show-id';

export default function History() {
	const currentShowId = useCurrentShowId();
	const [{ loading: showLoading }, shows] = useRecentShows(8, currentShowId);

	// TODO Date control

	return (
		<Grid container spacing={5}>
			{showLoading ? (
				<Container>
					<CircularProgress size="200" />
				</Container>
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
