import React from 'react';
import { Container } from '@mui/system';

import ViewHeading from './ViewHeading';

export default function TabPanel({ currentTab, id, title, children, addlProps }) {
	return currentTab === id ? (
		<Container {...addlProps}>
			{title ? <ViewHeading>{title}</ViewHeading> : null}
			{children}
		</Container>
	) : null;
}
