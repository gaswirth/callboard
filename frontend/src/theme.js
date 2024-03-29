import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		type: 'light',
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
			lightergray: 'rgba(235, 235, 235, 0.4)',
			lightgray: 'rgb(235, 235, 235)',
			gray: '#aaa',
		},
		warning: {
			main: '#d32f2f',
			strong: '#ce0606',
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
