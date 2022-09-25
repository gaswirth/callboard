import React, { useContext } from 'react';
import { Tab, Tabs, Typography, Box, AppBar, Toolbar } from '@mui/material';

import Logout from 'components/Logout';

import { useCompanyName } from 'hooks/queries/use-company-name';

import { AuthContext } from 'context/AuthContext';
import { generateCompanyShortName } from 'lib/functions';

export default function Header({ currentTab, handleTabChange }) {
	const { user } = useContext(AuthContext);
	const { data: companyData } = useCompanyName();

	const companyShortName = () => {
		const name = companyData.callboardOptionsSettings.callboardCompanyName;
		if (companyData) {
			return generateCompanyShortName(name);
		}

		return '';
	};

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
					<Typography variant="h6" textTransform="uppercase" sx={{ mr: 2 }}>
						{companyShortName()}
					</Typography>
					<Logout />
				</Toolbar>
			</AppBar>
		</Box>
	);
}
