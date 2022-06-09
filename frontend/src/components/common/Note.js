import React from 'react';
import { Container } from '@mui/system';
import { Card, Typography } from '@mui/material';

export default function Note({ title, children }) {
	return (
		<Container
			sx={{ width: '100%', textAlign: 'center', p: 3, mt: 4, backgroundColor: 'primary.lightgray' }}
			component={Card}
		>
			{title ? (
				<>
					<Typography variant="subtitle1" component="h3" sx={{ fontWeight: 700 }}>
						{title}
					</Typography>
					<Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
						{children}
					</Typography>
				</>
			) : null}
		</Container>
	);
}
