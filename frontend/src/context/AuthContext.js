import { createContext } from 'react';
import { useLocalStorage } from 'hooks/hooks';

export const adminRoles = ['administrator'];

export const AuthContext = createContext({
	user: null,
	setUser: () => null,
});

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useLocalStorage(null);

	const contextValue = {
		user,
		setUser,
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
