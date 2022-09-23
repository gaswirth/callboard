import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Box, Typography } from '@mui/material';

export default function QRCode({ string, size }) {
	return (
		<Box textAlign="center">
			<QRCodeSVG value={string} fgColor="#000" includeMargin={true} size={size ? size : 125} />
			<Typography variant="body2">{`URL: /signin/${string}`}</Typography>
		</Box>
	);
}
