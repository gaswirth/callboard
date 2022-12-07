import React, { useState, useContext } from 'react';
import { Container, Typography } from '@mui/material';

import Header from '@/components/Header';
import TabPanel from '@/components/TabPanel';

import Roster from './views/Roster';
import History from './views/History';
import Now from './views/Now';
import ShowControl from './views/ShowControl';

import { AuthContext } from '@/context/AuthContext';
import { useCompanyName } from '@/hooks/queries/use-company-name';

export default function Admin() {
	const { user } = useContext(AuthContext);
	const { error: backendError } = useCompanyName();
	const [currentTab, setCurrentTab] = useState('showControl');

	const handleTabChange = (event, newValue) => {
		setCurrentTab(newValue);
	};

	return backendError ? (
		<Typography variant="h5" textAlign="center" sx={{ my: 2 }}>
			Could not initialize Callboard. Please ensure the database server is running and the Callboard plugin is active.
		</Typography>
	) : (
		<>
			<Header currentTab={currentTab} handleTabChange={handleTabChange} />
			{user?.isAdmin ? (
				<Container sx={{ p: 3 }} maxWidth="xl">
					<TabPanel currentTab={currentTab} id="showControl" title="SM/CM">
						<ShowControl />
					</TabPanel>
					<TabPanel currentTab={currentTab} id="roster" title="Roster">
						<Roster />
					</TabPanel>
					<TabPanel currentTab={currentTab} id="history" title="History">
						<History />
					</TabPanel>
				</Container>
			) : (
				<Now />
			)}
		</>
	);
}
