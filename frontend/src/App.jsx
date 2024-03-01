import { useContext } from 'react';
import { Box } from '@chakra-ui/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

import Login from '@components/Login';
import Main from '@components/Main';

import { AuthContext } from '@context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
	const { user } = useContext(AuthContext);

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<BrowserRouter>
				{!user?.id ? (
					<Box maxW={400} my={2} mx="auto">
						<Login />
					</Box>
				) : (
					<Main />
				)}
			</BrowserRouter>
		</LocalizationProvider>
	);
}
