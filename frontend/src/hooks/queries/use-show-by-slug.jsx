/**
 * useShowBySlug hook. Queries the show with the most recent `datetime`.
 */

// TODO Determine if this is necessary for proper sign-in.

import { gql, useQuery } from '@apollo/client';
import { prepareShow } from '@lib/functions';

export const QUERY_SHOW_BY_SLUG = gql`
	query ShowBySlug($slug: String!) {
		showBy(slug: $slug) {
			id
			databaseId
			datetime
			attendance
			notes
		}
	}
`;

export const useShowBySlug = (slug) => {
	const result = useQuery(QUERY_SHOW_BY_SLUG, {
		variables: {
			slug,
		},
	});

	// Prepare show data.
	const show = result.data ? prepareShow(result.data.showBy) : null;

	return [result, show];
};
