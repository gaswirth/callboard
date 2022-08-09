/**
 * @see {@link https://github.com/mikejolley/morrics-magical-cauldron/blob/main/src/context/auth-context.js}
 */
import { createContext } from 'react';
import { useLocalStorage } from 'hooks/hooks';

export const AuthContext = createContext({
	isLoggedIn: false,
	setIsLoggedIn: () => null,
});

export const AuthContextProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useLocalStorage(false);

	const contextValue = {
		isLoggedIn,
		setIsLoggedIn,
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
