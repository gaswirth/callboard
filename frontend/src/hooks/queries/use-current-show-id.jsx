/**
 * useCurrentShowId hook. Queries the most recent show and retrieves its id.
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

/**
 * @returns string The show's databaseId.
 */
export const useCurrentShowId = () => {
	const result = useQuery(QUERY_CURRENT_SHOW_ID);

	return result.data?.shows.nodes[0].databaseId;
};
