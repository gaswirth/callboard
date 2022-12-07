import React, { useContext } from 'react';
import { Button } from '@mui/material';

import { AuthContext } from 'context/AuthContext';
import { useLogoutMutation } from 'hooks/mutations/use-logout-mutation';
import { LogoutOutlined } from '@mui/icons-material';

export default function Logout() {
	const { setUser } = useContext(AuthContext);
	const { logoutMutation } = useLogoutMutation();

	const onLogout = () => {
		setUser(null);
	};

	const handleLogout = () => {
		logoutMutation().then(onLogout);
	};

	return (
		<Button variant="outlined" color='light' onClick={handleLogout} endIcon={<LogoutOutlined />}>
			Logout
		</Button>
	);
}
