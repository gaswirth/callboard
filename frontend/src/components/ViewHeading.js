import React from 'react';
import { Typography } from '@mui/material';

export default function ViewHeading({ children, variant = 'h4', addlProps }) {
	return (
		<Typography variant={variant} textTransform="uppercase" align="center" sx={{ mb: 2 }} {...addlProps}>
			{children}
		</Typography>
	);
}
