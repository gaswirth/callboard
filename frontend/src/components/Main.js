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

const QUERY_CURRENT_SHOW_ID = gql`
	query GetCurrentShowId {
		callboardOptionsSettings {
			currentShow
		}
	}
`;

export default function Main() {
	const [currentTab, setCurrentTab] = useState('now');
	const { productionDispatch } = useContext(ProductionContext);
	const [rosterMessage, setRosterMessage] = useState('');

	// Get roster
	const { data: rosterData, loading: rosterLoading, error: rosterError } = useQuery(QUERY_ROSTER);

	// Get current show ID.
	const {
		data: currentShowData,
		loading: currentShowLoading,
		error: currentShowError,
	} = useQuery(QUERY_CURRENT_SHOW_ID);

	// Query current show.
	useEffect(() => {
		if (!currentShowData) return;

		productionDispatch({
			type: 'SET_CURRENT_SHOW_ID',
			id: currentShowData.callboardOptionsSettings.currentShow,
		});
	}, [productionDispatch, currentShowData]);

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
					{currentShowLoading ? 'Loading show...' : <Now />}
					{currentShowError ? (
						<Typography variant="subtitle2" color="warning.main">{`Error: ${currentShowError}`}</Typography>
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
