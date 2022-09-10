import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Admin from './Admin';
import Cast from './Cast';

export default function Main() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Admin />} />
				<Route path="/signin/:slug" element={<Cast />} />
			</Routes>
		</Router>
	);
}
