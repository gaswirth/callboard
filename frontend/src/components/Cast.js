import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Skeleton, Typography } from '@mui/material';

import SingleShow from './views/SingleShow';

import { useCompanyName } from 'hooks/queries/use-company-name';
import { useShowBySlug } from 'hooks/queries/use-show-by-slug';
import ShowTable from './common/ShowTable';

// TODO sign current user in on first visit, unless status has already been set.

export default function Cast() {
	const { error: backendError } = useCompanyName();
	const { slug } = useParams();
	const [{ loading: showLoading }, show] = useShowBySlug(slug);

	return backendError ? (
		<Typography variant="h5" textAlign="center" sx={{ my: 2 }}>
			Something's gone terribly, terribly wrong. Seek shelter (bring marshmallows).
		</Typography>
	) : (
		<Container sx={{ p: 3, width: 600 }} maxWidth="xl">
			{showLoading ? (
				<Skeleton animation="wave">
					<ShowTable />
				</Skeleton>
			) : (
				<SingleShow show={show} />
			)}
		</Container>
	);
}
