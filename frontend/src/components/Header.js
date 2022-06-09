import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
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
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							<Link component={RouterLink} to="/now" sx={linkStyle}>
								{`Now: ${format(shows[currentShow].datetime, 'M/d') /* The show's datetime label */}`}
							</Link>
						</Typography>
					)}
					<Typography variant="h6" component="div" sx={{ flexGrow: 1, textTransform: 'uppercase' }}>
						{name}
					</Typography>
					<Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
						<Link component={RouterLink} to="/" sx={linkStyle}>
							This Week
						</Link>
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
