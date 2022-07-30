import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Container } from '@mui/system';
import Header from './Header';
import TabPanel from './common/TabPanel';
import { QUERY_ROSTER, QUERY_IMMEDIATE_POST_IDS } from '../lib/gql';

/**
 * Views
 */
import Week from './views/Week';
import Now from './views/Now';
import Admin from './views/Admin';

import ProductionContext from '../ProductionContext';
import { Typography } from '@mui/material';
import { useShow } from '../lib/hooks';

export default function Main() {
	const [currentTab, setCurrentTab] = useState('now');
	const {
		production: { currentShowId, shows },
		productionDispatch,
	} = useContext(ProductionContext);
	const [rosterMessage, setRosterMessage] = useState('');

	const currentShow = useShow(shows, currentShowId);

	// Get roster
	const { data: rosterData, loading: rosterLoading, error: rosterError } = useQuery(QUERY_ROSTER);

	// Get current show ID.
	const {
		data: showData,
		loading: currentShowLoading,
		error: currentShowError,
	} = useQuery(QUERY_IMMEDIATE_POST_IDS, {
		variables: {
			showsBefore: currentShow?.datetime,
		},
		pollInterval: 500,
	});

	// Query current show.
	useEffect(() => {
		if (!showData) return;

		productionDispatch({
			type: 'SET_CURRENT_PREVIOUS_SHOW_ID',
			currentShowId: showData.callboardOptionsSettings.currentShow,
			previousShowId: showData.shows.nodes[0].databaseId,
		});
	}, [productionDispatch, showData]);

	/**
	 * Retrieve and set the roster.
	 */
	useEffect(() => {
		if (rosterData) {
			// Send Roster to context.
			productionDispatch({
				type: 'SET_ROSTER',
				payload: rosterData.companyMembers,
			});
		}

		if (rosterLoading) setRosterMessage('Loading roster...');
		if (rosterError) setRosterMessage(`${rosterError.message}`);

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
					{currentShowLoading ? 'Loading show...' : <Now />}
					{currentShowError ? (
						<Typography variant="subtitle2" color="warning.main">{`${currentShowError}`}</Typography>
					) : null}
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
