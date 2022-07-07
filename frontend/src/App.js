import React, { useReducer } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Main from './components/Main';

import ProductionContext, { productionReducer, initialProduction } from './ProductionContext';

/**
 * Apollo client.
 */
const client = new ApolloClient({
	uri: 'http://localhost/backend/graphql',
	cache: new InMemoryCache(),
});

export default function App() {
	const [production, productionDispatch] = useReducer(productionReducer, initialProduction);

	return (
		<ApolloProvider client={client}>
			<ProductionContext.Provider value={{ production, productionDispatch }}>
				<Main />
			</ProductionContext.Provider>
		</ApolloProvider>
	);
}
