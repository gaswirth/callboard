import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import ShowContext from '../context/ShowContext';

export default function Header() {
	const {
		show: { name },
	} = useContext(ShowContext);

	const linkStyle = {
		color: 'primary.light',
		textDecoration: 'none',
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					{/* <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton> */}
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<Link component={RouterLink} to="/now" sx={linkStyle}>
							This Show
						</Link>
					</Typography>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<Link component={RouterLink} to="/" sx={linkStyle}>
							{name}
						</Link>
					</Typography>
					<Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
						<Link component={RouterLink} to="/" sx={linkStyle}>
							Week of xx/yy - xx/yy
						</Link>
					</Typography>
					{/* <Button color="inherit">Login</Button> */}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
