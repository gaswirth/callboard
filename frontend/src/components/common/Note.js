import React from 'react';
import { Container } from '@mui/system';
import { Card, Typography } from '@mui/material';

export default function Note({ children }) {
	return (
		<Container
			sx={{ width: '100%', textAlign: 'center', p: 3, mt: 4, backgroundColor: 'primary.lightgray' }}
			component={Card}
		>
			<Typography variant="subtitle2">{children}</Typography>
		</Container>
	);
}
