import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IconButton, Link } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/Flaky';
import { Link as RouterLink } from 'react-router-dom';

import ProductionContext from '../ProductionContext';
import { format } from 'date-fns';
import { isEmpty } from 'lodash';

export default function Header() {
	const {
		production: { name, currentShow, shows },
	} = useContext(ProductionContext);

	const linkStyle = {
		color: 'primary.light',
		textDecoration: 'none',
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					{isEmpty(shows) ? null : (
						// TODO Change to Tabs navigation (and maybe remove Router?)
						<>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								<Link component={RouterLink} to="/now" sx={linkStyle}>
									{`Now: ${format(shows[currentShow].datetime, 'M/d') /* The show's datetime label */}`}
								</Link>
							</Typography>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								<Link component={RouterLink} to="/" sx={linkStyle}>
									This Week
								</Link>
							</Typography>
						</>
					)}
					<Typography variant="h6" component="div" sx={{ flexGrow: 1, textTransform: 'uppercase' }}>
						{name}
					</Typography>
					<Typography variant="h6" component="div" sx={{ flexGrow: 0 }}></Typography>
					<IconButton sx={{ ml: 2 }}>
						<ManageAccountsIcon sx={{ color: 'primary.light' }} />
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
