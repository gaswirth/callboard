import React, { useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

// Data
import { data } from './lib/dummy';

/**
 * Pages
 */
import Home from './pages/index';
import Now from './pages/now';

import ProductionContext, { productionReducer, initialProduction } from './/ProductionContext';

export default function App() {
	const [production, productionDispatch] = useReducer(productionReducer, initialProduction);

	useEffect(() => {
		if (production.currentShow === 0) {
			productionDispatch({
				type: 'INIT',
				...data,
			});
		}
	}, [production]);

	return (
		<Router>
			<ProductionContext.Provider value={{ production, productionDispatch }}>
				<Header />
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="/now" element={<Now />} />
				</Routes>
			</ProductionContext.Provider>
		</Router>
	);
}
