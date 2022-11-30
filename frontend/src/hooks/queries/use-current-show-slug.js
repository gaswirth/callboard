/**
 * useCurrentShowSlug hook. Queries the most recent show and retrieves its slug.
 */

import { gql, useQuery } from '@apollo/client';

export const QUERY_CURRENT_SHOW_SLUG = gql`
	query currentShowId {
		shows(first: 1) {
			nodes {
				slug
			}
		}
	}
`;

/**
 * @returns string The show's slug.
 */
export const useCurrentShowSlug = () => {
	const result = useQuery(QUERY_CURRENT_SHOW_SLUG);

	return result.data?.shows.nodes[0].slug;
};
