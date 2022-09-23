import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		type: 'dark',
		text: {
			main: '#333',
			light: '#aaa',
		},
		primary: {
			main: '#344cd4',
			dark: '#333',
		},
		secondary: {
			main: '#ff9100',
		},
		neutral: {
			lightgray: 'rgb(235, 235, 235)',
			gray: '#aaa',
		},
		warning: {
			main: '#d32f2f',
		},
		light: {
			main: '#fff',
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
