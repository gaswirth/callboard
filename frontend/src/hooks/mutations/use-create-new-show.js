import { gql, useMutation } from '@apollo/client';
import { formatISO } from 'date-fns';

// TODO createNewShow --> newShow

export const MUTATE_NEW_SHOW = gql`
	mutation CreateNewShow($input: CreateNewShowInput!) {
		createNewShow(input: $input) {
			clientMutationId
			newShowId
		}
	}
`;

export const useCreateNewShow = (datetime) => {
	const [mutation, mutationResults] = useMutation(MUTATE_NEW_SHOW);

	// TODO make sure date time is unique?
	const newShowMutation = (datetime) => {
		return mutation({
			variables: {
				input: {
					clientMutationId: 'createNewShowMutation',
					datetime: formatISO(datetime),
				},
			},
		});
	};

	return { newShowMutation, results: mutationResults };
};
