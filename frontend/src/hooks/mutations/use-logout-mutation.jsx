/**
 * useLogout hook. GraphQL mutation clears User cookies.
 */

import { gql, useMutation, useApolloClient } from '@apollo/client';

export const MUTATE_LOGOUT = gql`
	mutation Logout {
		logout(input: {}) {
			status
		}
	}
`;

export const useLogoutMutation = () => {
	const apolloClient = useApolloClient();
	const [mutation, mutationResults] = useMutation(MUTATE_LOGOUT);

	const logoutMutation = async () => {
		await apolloClient.clearStore();
		return mutation();
	};

	return { logoutMutation, results: mutationResults };
};
