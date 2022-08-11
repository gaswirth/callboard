import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Tab, Tabs, Typography } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';

import { useCompanyName } from 'hooks/queries/use-company-name';

import { AuthContext } from 'context/AuthContext';

export default function Header({ currentTab, handleTabChange }) {
	const { user } = useContext(AuthContext);
	const { data: companyData } = useCompanyName();

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					{user?.id ? (
						<Tabs
							value={currentTab}
							onChange={handleTabChange}
							aria-label="main menu"
							indicatorColor="secondary"
							textColor="inherit"
							sx={{ flexGrow: 1 }}
						>
							<Tab value="now" label="Now" />
							{user?.isAdmin ? <Tab value="admin" label="Admin" /> : null}
						</Tabs>
					) : null}

					<Typography variant="h6" textTransform="uppercase">
						{companyData?.callboardOptionsSettings.callboardCompanyName}
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
