import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		type: 'dark',
		primary: {
			main: '#344cd4',
			light: '#fff',
		},
		secondary: {
			main: '#ff9100',
		},
		warning: {
			main: '#d32f2f',
		},
	},
	spacing: 8,
	shape: {
		borderRadius: 4,
	},
});

export default theme;
