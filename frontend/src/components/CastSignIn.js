import React from 'react';
import { Container } from '@mui/material';

import Now from './views/Now';

export default function CastSignIn() {
	return (
		<Container sx={{ p: 3 }} maxWidth="xl">
			<Now signUsersIn={true} />
		</Container>
	);
}
