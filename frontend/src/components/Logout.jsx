import React, { useContext } from 'react';
import { IconButton } from '@chakra-ui/react';
import { AuthContext } from '@context/AuthContext';
import { useLogoutMutation } from '@hooks/mutations/use-logout-mutation';
import { SlLogout } from 'react-icons/sl';

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
		<IconButton onClick={handleLogout} icon={<SlLogout />} aria-label="Logout" variant="outline">
			Logout
		</IconButton>
	);
}
