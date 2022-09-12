import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Box, Typography } from '@mui/material';

export default function QRCode({ string }) {
	return (
		<Box textAlign="center">
			<QRCodeSVG value={string} fgColor="#000" includeMargin={true} />
			<Typography variant="body2">{`URL: /signin/${string}`}</Typography>
		</Box>
	);
}
