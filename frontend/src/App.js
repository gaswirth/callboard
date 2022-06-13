import React, { useEffect, useReducer, useState } from 'react';
import Header from './components/Header';
import TabPanel from './components/common/TabPanel';

/**
 * Views
 */
import Week from './components/views/Week';
import Now from './components/views/Now';
import Admin from './components/views/Admin';

// Data
import { data } from './lib/dummy';

import ProductionContext, { productionReducer, initialProduction } from './ProductionContext';
import { Container } from '@mui/system';

export default function App() {
	const [production, productionDispatch] = useReducer(productionReducer, initialProduction);
	const [currentTab, setCurrentTab] = useState('now');

	// Initialize the Context with data.
	useEffect(() => {
		if (production.currentShowId === 0) {
			productionDispatch({
				type: 'INIT',
				...data,
			});
		}
	}, [production]);

	const handleTabChange = (event, newValue) => {
		setCurrentTab(newValue);
	};

	return (
		<ProductionContext.Provider value={{ production, productionDispatch }}>
			<Header currentTab={currentTab} handleTabChange={handleTabChange} />
			<Container sx={{ p: 3 }} maxWidth="xl">
				<TabPanel currentTab={currentTab} id="now" title="This Show">
					<Now admin={false} />
				</TabPanel>
				<TabPanel currentTab={currentTab} id="admin" title="SM/CM">
					<Admin />
				</TabPanel>
				<TabPanel currentTab={currentTab} id="week" title="This Week">
					<Week />
				</TabPanel>
			</Container>
		</ProductionContext.Provider>
	);
}
