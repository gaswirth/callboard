import React from 'react';
import { Grid, CircularProgress, Box } from '@chakra-ui/react';

import ShowTable from '@components/ShowTable';

import { useRecentShows } from '@hooks/queries/use-recent-shows';
import { useCurrentShowId } from '@hooks/queries/use-current-show-id';

export default function History() {
	const currentShowId = useCurrentShowId();
	const [{ loading: showLoading }, shows] = useRecentShows(8, currentShowId);

	// TODO Date control

	return (
		<Grid templateColumns={{ sm: 'repeat(2, 1fr)' }} gap={5}>
			{showLoading ? (
				<Box display="flex" justifyContent="center" alignItems="center" height="200px">
					<CircularProgress isIndeterminate size="200px" />
				</Box>
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
