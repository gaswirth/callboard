import React, { useContext, useState } from 'react';
import { Container } from '@mui/system';
import { Box, Button, Typography } from '@mui/material';

import Header from 'components/Header';
import TabPanel from 'components/common/TabPanel';
import Now from './views/Now';
import Roster from './views/Roster';
import ShowControl from './views/ShowControl';
import Login from 'components/common/Login';

import { useCompanyName } from 'hooks/queries/use-company-name';
import { useLogoutMutation } from 'hooks/mutations/use-logout-mutation';

import { AuthContext } from 'context/AuthContext';

export default function Main() {
	const { user, setUser } = useContext(AuthContext);
	const { logoutMutation } = useLogoutMutation();
	const [logoutErrorCode, setLogoutErrorCode] = useState('');

	const { error: backendError } = useCompanyName();

	const [currentTab, setCurrentTab] = useState('now');

	const onLogout = () => {
		setUser(null);
	};

	const handleLogout = () => {
		logoutMutation()
			.then(onLogout)
			.catch((errors) => setLogoutErrorCode(errors.message));
	};

	const handleTabChange = (event, newValue) => {
		setCurrentTab(newValue);
	};

	return backendError ? (
		<Typography variant="h5" textAlign="center" sx={{ my: 2 }}>
			Could not initialize Callboard. Please ensure the server is running and the Callboard plugin is active.
		</Typography>
	) : (
		<>
			<Header currentTab={currentTab} handleTabChange={handleTabChange} />
			{!user?.id ? (
				<Box maxWidth={400} sx={{ my: 2, mx: 'auto' }}>
					<Login />
				</Box>
			) : (
				<Container sx={{ p: 3 }} maxWidth="xl">
					<TabPanel
						currentTab={currentTab}
						id="now"
						title={'This Show'}
						addlProps={{ sx: { width: 600, maxWidth: '100%', display: 'block' } }}
					>
						<Now />
					</TabPanel>
					<TabPanel currentTab={currentTab} id="showControl" title="SM/CM">
						<ShowControl />
					</TabPanel>
					<TabPanel currentTab={currentTab} id="roster" title="Roster">
						<Roster />
					</TabPanel>
					<Container sx={{ mt: 5, textAlign: 'left' }}>
						<Button variant="outlined" onClick={handleLogout}>
							Logout
						</Button>
						{logoutErrorCode ? (
							<Typography variant="body2" sx={{ color: 'warning.main', my: 1 }}>
								{logoutErrorCode}
							</Typography>
						) : null}
					</Container>
				</Container>
			)}
		</>
	);
}
