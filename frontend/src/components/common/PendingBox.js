import React from 'react';
import { Box } from '@mui/system';

export default function PendingBox() {
	return (
		<Box
			sx={{
				height: '40px',
				width: '40px',
				mx: 'auto',
				backgroundColor: 'primary.lightgray',
				borderRadius: 1,
			}}
		></Box>
	);
}
