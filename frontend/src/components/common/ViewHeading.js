import { Typography } from '@mui/material';
import React from 'react';

export default function ViewHeading({ children, addlProps }) {
	return (
		<Typography variant="h6" textTransform="uppercase" align="center" sx={{ mb: 2 }} {...addlProps}>
			{children}
		</Typography>
	);
}
