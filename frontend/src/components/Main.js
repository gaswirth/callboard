import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Container } from '@mui/system';
import Header from './Header';
import TabPanel from './common/TabPanel';
import { QUERY_INIT } from '../lib/gql';

/**
 * Views
 */
import Now from './views/Now';
import Admin from './views/Admin';

import ProductionContext from '../ProductionContext';
import { isEmpty } from 'lodash';

export default function Main() {
	const { productionDispatch } = useContext(ProductionContext);

	const [currentTab, setCurrentTab] = useState('now');

	// Get the Roster and latest show ID.
	const { data: initData, loading: initLoading, error: initError } = useQuery(QUERY_INIT);

	// Send data to ProductionContext
	useEffect(() => {
		if (isEmpty(initData)) return;

		const { companyMembers } = initData;

		productionDispatch({
			type: 'SET_ROSTER',
			roster: companyMembers,
		});
	}, [initData, productionDispatch]);

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
		</>
	);
}
