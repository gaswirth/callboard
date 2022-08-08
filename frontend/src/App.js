import React, { useReducer } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import Main from './components/Main';

import ProductionContext, { productionReducer, initialProduction } from './context/ProductionContext';

/**
 * TODO
 *
 * - "Freeze" or "Record" show: once attendance is complete, lock it in and "record" it. No further changes can be made.
 */

/**
 * Apollo client.
 */
const httpLink = createHttpLink({
	uri: '/graphql',
});

const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});

export default function App() {
	const [production, productionDispatch] = useReducer(productionReducer, initialProduction);

	return (
		<ApolloProvider client={client}>
			<ProductionContext.Provider value={{ production, productionDispatch }}>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<Main />
				</LocalizationProvider>
			</ProductionContext.Provider>
		</ApolloProvider>
	);
}
