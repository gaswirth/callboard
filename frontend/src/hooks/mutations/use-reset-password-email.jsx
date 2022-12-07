/**
 * useLogin hook. Mutation to provide credentials and set an HTTP cookie.
 */

import { gql, useMutation } from '@apollo/client';

const MUTATE_LOGIN = gql`
	mutation SendPasswordResetEmail($input: SendPasswordResetEmailInput = { username: "" }) {
		sendPasswordResetEmail(input: $input) {
			success
		}
	}
`;

export const useSendPasswordResetEmail = () => {
	const [mutation, mutationResults] = useMutation(MUTATE_LOGIN);

	const sendResetPasswordEmailMutation = ({ username }) => {
		return mutation({
			variables: {
				input: {
					clientMutationId: 'sendResetPasswordEmailMutation',
					username: username,
				},
			},
		});
	};

	return { sendResetPasswordEmailMutation, results: mutationResults };
};
