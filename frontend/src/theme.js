import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		type: 'dark',
		primary: {
			main: '#344cd4',
			light: '#fff',
			lightgray: 'rgb(235, 235, 235)',
			gray: '#aaa',
			dark: '#333',
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
		borderRadius: 6,
	},
	components: {
		MuiTableCell: {
			styleOverrides: {
				root: {
					textAlign: 'center',
					paddingTop: '1em',
					paddingBottom: '1em',
				},
			},
		},
	},
});

export default theme;
