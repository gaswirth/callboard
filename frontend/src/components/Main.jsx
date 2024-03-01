import { Route, Routes } from 'react-router-dom';

import Admin from './Admin';
import CastSignIn from './CastSignIn';

export default function Main() {
	return (
		<Routes>
			<Route path="/" element={<Admin />} />
			<Route path="/signin/:slug" element={<CastSignIn />} />
		</Routes>
	);
}
