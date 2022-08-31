import React, { useContext } from 'react';

import Admin from './Admin';
import Cast from './Cast';

import { AuthContext } from 'context/AuthContext';

export default function Main() {
	const {
		user: { isAdmin },
	} = useContext(AuthContext);

	return isAdmin ? <Admin /> : <Cast />;
}
