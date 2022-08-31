import React, { useState, useContext } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import Login from 'components/Login';
import Main from './components/Main';
import { useLogoutMutation } from 'hooks/mutations/use-logout-mutation';

import { AuthContext } from 'context/AuthContext';

export default function App() {
	const { user, setUser } = useContext(AuthContext);
	const { logoutMutation } = useLogoutMutation();
	const [logoutErrorCode, setLogoutErrorCode] = useState('');

	const onLogout = () => {
		setUser(null);
	};

	const handleLogout = () => {
		logoutMutation()
			.then(onLogout)
			.catch((errors) => setLogoutErrorCode(errors.message));
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			{!user?.id ? (
				<Box maxWidth={400} sx={{ my: 2, mx: 'auto' }}>
					<Login />
				</Box>
			) : (
				<>
					<Main />
					<Button variant="outlined" onClick={handleLogout}>
						Logout
					</Button>
					{logoutErrorCode ? (
						<Typography variant="body2" sx={{ color: 'warning.main', my: 1 }}>
							{logoutErrorCode}
						</Typography>
					) : null}
				</>
			)}
		</LocalizationProvider>
	);
}
