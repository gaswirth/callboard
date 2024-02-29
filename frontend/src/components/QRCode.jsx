import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Box, Text } from '@chakra-ui/react';

export default function QRCode({ string, size }) {
	return (
		<Box textAlign="center">
			<QRCodeSVG value={string} fgColor="#000" includeMargin={true} size={size ? size : 125} />
			<Text fontSize="sm">{`URL: ${string}`}</Text>
		</Box>
	);
}
