import React, { useContext } from 'react';
import { Tab, Tabs, Typography, Box, AppBar, Toolbar } from '@mui/material';

import { useCompanyName } from 'hooks/queries/use-company-name';

import { AuthContext } from 'context/AuthContext';

export default function Header({ currentTab, handleTabChange }) {
	const { user } = useContext(AuthContext);
	const { data: companyData } = useCompanyName();

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					{user?.isAdmin ? (
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
					) : null}
					<Typography variant="h6" textTransform="uppercase">
						{companyData?.callboardOptionsSettings.callboardCompanyName}
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
