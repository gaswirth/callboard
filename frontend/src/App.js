import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import Main from './components/Main';

import { AuthContextProvider } from './context/AuthContext';

/**
 * Apollo client.
 */
const httpLink = createHttpLink({
	uri: '/graphql',
	credentials: 'include',
});
const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});

export default function App() {
	return (
		<AuthContextProvider>
			<ApolloProvider client={client}>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<Main />
				</LocalizationProvider>
			</ApolloProvider>
		</AuthContextProvider>
	);
}
