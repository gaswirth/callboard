/**
 * @see {@link https://github.com/mikejolley/morrics-magical-cauldron/blob/main/src/context/auth-context.js}
 */
import { createContext } from 'react';
import { useLocalStorage } from 'hooks/hooks';

export const AuthContext = createContext({
	isLoggedIn: false,
	userId: null,
	setIsLoggedIn: () => null,
	setUserId: () => null,
});

export const AuthContextProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useLocalStorage(false);
	const [userId, setUserId] = useLocalStorage(null);

	const contextValue = {
		isLoggedIn,
		userId,
		setIsLoggedIn,
		setUserId,
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
