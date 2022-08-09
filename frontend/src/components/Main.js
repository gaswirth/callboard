import React, { useContext, useEffect, useState } from 'react';
import { Container } from '@mui/system';
import { Box, Button, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import Header from './Header';
import TabPanel from './common/TabPanel';
import Login from './common/Login';
import { useLogoutMutation } from 'hooks/mutations/use-logout-mutation';
import { useRoster } from 'hooks/queries/use-roster';

import { AuthContext } from 'context/AuthContext';
import ProductionContext from 'context/ProductionContext';

/**
 * Views
 */
import Now from './views/Now';
import Admin from './views/Admin';

export default function Main() {
	const { productionDispatch } = useContext(ProductionContext);
	const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
	const { logoutMutation } = useLogoutMutation();
	const [logoutErrorCode, setLogoutErrorCode] = useState('');

	const [currentTab, setCurrentTab] = useState('now');

	// Get the Roster and latest show ID.
	const { data: rosterData } = useRoster();

	// Send data to ProductionContext
	useEffect(() => {
		if (isEmpty(rosterData)) return;

		const { companyMembers } = rosterData;

		productionDispatch({
			type: 'SET_ROSTER',
			roster: companyMembers,
		});
	}, [rosterData, productionDispatch]);

	const handleLogout = () => {
		logoutMutation()
			.then(() => {
				setIsLoggedIn(false);
			})
			.catch((errors) => setLogoutErrorCode(errors.message));
	};

	const handleTabChange = (event, newValue) => {
		setCurrentTab(newValue);
	};

	return (
		<>
			<Header currentTab={currentTab} handleTabChange={handleTabChange} />
			{!isLoggedIn ? (
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
					<TabPanel currentTab={currentTab} id="admin" title="SM/CM">
						<Admin />
					</TabPanel>
					{isLoggedIn ? (
						<Container sx={{ my: 1, textAlign: 'right' }}>
							<Button variant="text" onClick={handleLogout}>
								Logout
							</Button>
							{logoutErrorCode ? (
								<Typography variant="body2" sx={{ color: 'warning.main', my: 1 }}>
									{logoutErrorCode}
								</Typography>
							) : null}
						</Container>
					) : null}
				</Container>
			)}
		</>
	);
}
