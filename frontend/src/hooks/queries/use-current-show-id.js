/**
 * useCurrentShowId hook. Queries the show with the most recent `datetime` and retrieves its databaseId.
 */

import { gql, useQuery } from '@apollo/client';

export const QUERY_CURRENT_SHOW_ID = gql`
	query currentShowId {
		shows(first: 1) {
			nodes {
				databaseId
			}
		}
	}
`;

export const useCurrentShowId = () => {
	const result = useQuery(QUERY_CURRENT_SHOW_ID);

	return result.data?.shows.nodes[0].databaseId;
};
