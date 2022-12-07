/**
 * useUpdateCompanyMember hook. GraphQL mutation to update a Company Member's data.
 */
import { gql, useMutation } from '@apollo/client';
import { QUERY_ROSTER } from '@/hooks/queries/use-roster';

export const MUTATE_UPDATE_COMPANY_MEMBER = gql`
	mutation UpdateCompanyMember($input: UpdateCompanyMemberInput!) {
		updateCompanyMember(input: $input) {
			clientMutationId
			updatedCompanyMember
		}
	}
`;

export const useUpdateCompanyMember = () => {
	const [mutation, mutationResults] = useMutation(MUTATE_UPDATE_COMPANY_MEMBER);

	const updateCompanyMemberMutation = ({ id, firstName, lastName, email, role, active }) => {
		return mutation({
			variables: {
				input: {
					clientMutationId: 'updateCompanyMemberMutation',
					id,
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

	return { updateCompanyMemberMutation, results: mutationResults };
};
