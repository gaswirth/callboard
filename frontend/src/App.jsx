import React, { useContext } from 'react';
import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

import Login from '@/components/Login';
import Main from '@/components/Main';

import { AuthContext } from '@/context/AuthContext';

export default function App() {
	const { user } = useContext(AuthContext);

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			{!user?.id ? (
				<Box maxWidth={400} sx={{ my: 2, mx: 'auto' }}>
					<Login />
				</Box>
			) : (
				<Main />
			)}
		</LocalizationProvider>
	);
}
