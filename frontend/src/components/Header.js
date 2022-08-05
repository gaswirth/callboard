import React, { useCallback, useContext, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Tab, Tabs, TextField, Typography } from '@mui/material';
import { QUERY_COMPANY_NAME, MUTATE_UPDATE_COMPANY_NAME } from '../lib/gql';

import ProductionContext from '../ProductionContext';

export default function Header({ currentTab, handleTabChange }) {
	const { data, loading, error } = useQuery(QUERY_COMPANY_NAME);

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
						{/* <Tab value="week" label="This Week" /> */}
						<Tab value="admin" label="Admin" />
					</Tabs>

					<Typography variant="h6" textTransform="uppercase">
						{data?.callboardOptionsSettings.companyName}
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
