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

import ShowContext, { showReducer, initialShow } from './context/ShowContext';

export default function App() {
	const [show, showDispatch] = useReducer(showReducer, initialShow);

	useEffect(() => {
		if (show.currentShow.id === 0) {
			showDispatch({
				type: 'INIT',
				...data,
			});
		}
	}, [show]);

	return (
		<Router>
			<ShowContext.Provider value={{ show, showDispatch }}>
				<Header />
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="/now" element={<Now />} />
				</Routes>
			</ShowContext.Provider>
		</Router>
	);
}
