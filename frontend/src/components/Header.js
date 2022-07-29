import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Tab, Tabs } from '@mui/material';
import Typography from '@mui/material/Typography';

import ProductionContext from '../ProductionContext';

export default function Header({ currentTab, handleTabChange }) {
	const {
		production: { name },
	} = useContext(ProductionContext);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Tabs
						value={currentTab}
						onChange={handleTabChange}
						aria-label="main menu"
						indicatorColor="secondary"
						textColor="inherit"
						sx={{ flexGrow: 1 }}
					>
						<Tab value="now" label="Now" />
						<Tab value="week" label="This Week" />
						<Tab value="admin" label="Admin" />
					</Tabs>

					<Typography variant="h6" component="div" sx={{ textTransform: 'uppercase' }}>
						{name}
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
