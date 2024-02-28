/**
 * useNewCompanyMember hook. GraphQL mutation to create a new Company Member.
 */
import { gql, useMutation } from '@apollo/client';
import { QUERY_ROSTER } from '@hooks/queries/use-roster';

export const MUTATE_UPDATE_COMPANY_MEMBER = gql`
	mutation newCompanyMember($input: NewCompanyMemberInput!) {
		newCompanyMember(input: $input) {
			clientMutationId
			newCompanyMemberID
		}
	}
`;

export const useNewCompanyMember = () => {
	const [mutation, mutationResults] = useMutation(MUTATE_UPDATE_COMPANY_MEMBER);

	const newCompanyMemberMutation = ({ firstName, lastName, email, role, active }) => {
		return mutation({
			variables: {
				input: {
					clientMutationId: 'newCompanyMemberMutation',
					firstName,
					lastName,
					email,
					role,
					active,
				},
			},
			refetchQueries: [{ query: QUERY_ROSTER }],
		});
	};

	return { newCompanyMemberMutation, results: mutationResults };
};
