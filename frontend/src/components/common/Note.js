import React from 'react';
import { Container } from '@mui/system';
import { Card } from '@mui/material';

export default function Note({ children }) {
	return (
		<Container
			sx={{ width: '100%', textAlign: 'center', p: 3, mt: 4, backgroundColor: 'primary.lightgray' }}
			component={Card}
		>
			{children}
		</Container>
	);
}
