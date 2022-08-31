import React from 'react';
import { Container, Typography } from '@mui/material';

import Now from './views/Now';

import { useCompanyName } from 'hooks/queries/use-company-name';

export default function Cast() {
	const { error: backendError } = useCompanyName();

	return backendError ? (
		<Typography variant="h5" textAlign="center" sx={{ my: 2 }}>
			Something's gone terribly, terribly wrong. Seek advice. And whatever you do, don't touch the squirrels..
		</Typography>
	) : (
		<Container sx={{ p: 3, width: 600 }} maxWidth="xl">
			<Now />
		</Container>
	);
}
