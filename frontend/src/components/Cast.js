import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

import SingleShow from './views/SingleShow';

import { useCompanyName } from 'hooks/queries/use-company-name';

// TODO sign current user in on first visit, unless status has already been set.

export default function Cast() {
	const { error: backendError } = useCompanyName();
	const { slug } = useParams();

	return backendError ? (
		<Typography variant="h5" textAlign="center" sx={{ my: 2 }}>
			Something's gone terribly, terribly wrong. Seek shelter (bring marshmallows).
		</Typography>
	) : (
		<Container sx={{ p: 3, width: 600 }} maxWidth="xl">
			<SingleShow slug={slug} />
		</Container>
	);
}
