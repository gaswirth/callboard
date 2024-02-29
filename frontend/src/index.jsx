import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';

import App from './App';
import { AuthContextProvider } from '@context/AuthContext';
import { ChakraProvider } from '@chakra-ui/react';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const backend = import.meta.env.VITE_GRAPHQL_ENDPOINT ? import.meta.env.VITE_GRAPHQL_ENDPOINT : '';

/**
 * Apollo client.
 */
const httpLink = createHttpLink({
	uri: backend,
	credentials: 'include',
});
const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});

root.render(
	<React.StrictMode>
		<ChakraProvider>
			<ApolloProvider client={client}>
				<AuthContextProvider>
					<App />
				</AuthContextProvider>
			</ApolloProvider>
		</ChakraProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
