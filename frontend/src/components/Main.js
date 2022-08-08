import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Container } from '@mui/system';
import { isEmpty } from 'lodash';
import { QUERY_ROSTER } from '../lib/gql';
import Header from './Header';
import TabPanel from './common/TabPanel';

/**
 * Views
 */
import Now from './views/Now';
import Admin from './views/Admin';

import ProductionContext from '../context/ProductionContext';

export default function Main() {
	const { productionDispatch } = useContext(ProductionContext);

	const [currentTab, setCurrentTab] = useState('now');

	// Get the Roster and latest show ID.
	const { data: rosterData, loading: rosterLoading, error: rosterError } = useQuery(QUERY_ROSTER);

	// Send data to ProductionContext
	useEffect(() => {
		if (isEmpty(rosterData)) return;

		const { companyMembers } = rosterData;

		productionDispatch({
			type: 'SET_ROSTER',
			roster: companyMembers,
		});
	}, [rosterData, productionDispatch]);

	const handleTabChange = (event, newValue) => {
		setCurrentTab(newValue);
	};

	return (
		<>
			<Header currentTab={currentTab} handleTabChange={handleTabChange} />
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
			</Container>
			)
		</>
	);
}
