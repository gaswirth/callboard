import { gql, useMutation } from '@apollo/client';

const MUTATE_LOGIN = gql`
	mutation LoginUser($input: LoginWithCookiesInput!) {
		loginWithCookies(input: $input) {
			status
			clientMutationId
		}
	}
`;

export const useLoginMutation = () => {
	const [mutation, mutationResults] = useMutation(MUTATE_LOGIN);

	const loginMutation = ({ username, password }) => {
		return mutation({
			variables: {
				input: {
					login: username,
					password,
				},
			},
		});
	};

	return { loginMutation, results: mutationResults };
};
