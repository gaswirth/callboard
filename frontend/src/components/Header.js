import React, { useContext } from 'react';
import { Tab, Tabs, Typography, Box, AppBar, Toolbar } from '@mui/material';

import { useCompanyName } from 'hooks/queries/use-company-name';

import { AuthContext } from 'context/AuthContext';

export default function Header({ currentTab, handleTabChange }) {
	const { user } = useContext(AuthContext);
	const { data: companyData } = useCompanyName();

	return (
		<Box sx={{ flexGrow: 1 }}>
			{user?.isAdmin ? (
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
							<Tab value="showControl" label="Show Control" />
							<Tab value="history" label="History" />
							<Tab value="roster" label="Roster" />
						</Tabs>

						<Typography variant="h6" textTransform="uppercase">
							{companyData?.callboardOptionsSettings.callboardCompanyName}
						</Typography>
					</Toolbar>
				</AppBar>
			) : (
				<Typography>You're not supposed to be here...</Typography>
			)}
		</Box>
	);
}
