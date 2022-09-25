import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';

import App from './App';
import theme from './theme';
import { AuthContextProvider } from 'context/AuthContext';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const uri = process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL : '';

console.debug('process', process.env.REACT_APP_BACKEND_URL);

/**
 * Apollo client.
 */
const httpLink = createHttpLink({
	uri: uri,
	credentials: 'include',
});
const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});

root.render(
	<React.StrictMode>
		<CssBaseline />
		<ThemeProvider theme={theme}>
			<ApolloProvider client={client}>
				<AuthContextProvider>
					<App />
				</AuthContextProvider>
			</ApolloProvider>
		</ThemeProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
