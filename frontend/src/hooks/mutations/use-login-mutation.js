import { gql, useMutation } from '@apollo/client';

const MUTATE_LOGIN = gql`
	mutation LoginUser($input: LoginWithCookiesInput!) {
		loginWithCookies(input: $input) {
			clientMutationId
			userId
			roles
			status
		}
	}
`;

export const useLoginMutation = () => {
	const [mutation, mutationResults] = useMutation(MUTATE_LOGIN);

	const loginMutation = ({ username, password }) => {
		return mutation({
			variables: {
				input: {
					clientMutationId: 'loginMutation',
					login: username,
					password,
				},
			},
		});
	};

	return { loginMutation, results: mutationResults };
};
