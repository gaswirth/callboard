import React from 'react';
import { Container } from '@mui/material';

import ViewHeading from './ViewHeading';

export default function TabPanel({ currentTab, id, title, children }) {
	return currentTab === id ? (
		<Container>
			{title ? <ViewHeading>{title}</ViewHeading> : null}
			{children}
		</Container>
	) : null;
}
