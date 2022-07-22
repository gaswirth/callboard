import React, { useContext, useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Container } from '@mui/system';
import Header from './Header';
import TabPanel from './common/TabPanel';

/**
 * Views
 */
import Week from './views/Week';
import Now from './views/Now';
import Admin from './views/Admin';

import ProductionContext from '../ProductionContext';
import { Typography } from '@mui/material';

const QUERY_ROSTER = gql`
	query Roster {
		companyMembers {
			nodes {
				companyMemberData {
					role
				}
				databaseId
				title
			}
		}
	}
`;

export default function Main() {
	const [currentTab, setCurrentTab] = useState('now');
	const { productionDispatch } = useContext(ProductionContext);
	const [rosterMessage, setRosterMessage] = useState('');

	// Query Roster
	const { data: rosterData, loading: rosterLoading, error: rosterError } = useQuery(QUERY_ROSTER);

	// Query current show
	// TODO get real data from the server
	useEffect(() => {
		productionDispatch({
			type: 'SET_CURRENT_SHOW_ID',
			id: 16,
		});
	}, [productionDispatch]);

	/**
	 * Retrieve and set the roster.
	 */
	useEffect(() => {
		if (rosterData) {
			// Send Roster to context.
			productionDispatch({
				type: 'SET_ROSTER',
				payload: rosterData.companyMembers.nodes,
			});
		}

		if (rosterLoading) setRosterMessage('Loading roster...');
		if (rosterError) setRosterMessage(`Error: ${rosterError.message}`);

		return () => setRosterMessage('');
	}, [rosterError, rosterLoading, rosterData, productionDispatch]);

	const handleTabChange = (event, newValue) => {
		setCurrentTab(newValue);
	};

	return (
		<>
			<Header currentTab={currentTab} handleTabChange={handleTabChange} />
			<Typography>{rosterMessage}</Typography>
			<Container sx={{ p: 3 }} maxWidth="xl">
				<TabPanel
					currentTab={currentTab}
					id="now"
					title="This Show"
					addlProps={{ sx: { width: 600, maxWidth: '100%', display: 'block' } }}
				>
					<Now userIsAdmin={false} />
				</TabPanel>
				<TabPanel currentTab={currentTab} id="admin" title="SM/CM">
					<Admin />
				</TabPanel>
				<TabPanel currentTab={currentTab} id="week" title="This Week">
					<Week />
				</TabPanel>
			</Container>
		</>
	);
}
