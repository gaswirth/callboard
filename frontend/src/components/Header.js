import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import ProductionContext from '../context/ProductionContext';

export default function Header() {
	const {
		production: { name },
	} = useContext(ProductionContext);

	const linkStyle = {
		color: 'primary.light',
		textDecoration: 'none',
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<Link component={RouterLink} to="/now" sx={linkStyle}>
							This Show
						</Link>
					</Typography>
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
