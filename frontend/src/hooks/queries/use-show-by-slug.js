/**
 * useLastestShow hook. Queries the show with the most recent `datetime`.
 */

import { useEffect } from 'react';
import { isEmpty } from 'lodash';
import { gql, useQuery } from '@apollo/client';
import { prepareShow } from 'lib/functions';

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

	/**
	 * Manually run startPolling.
	 *
	 * @see {@link https://github.com/apollographql/apollo-client/issues/9819}
	 */
	useEffect(() => {
		const { data, startPolling, stopPolling } = result;

		if (isEmpty(data)) return;

		startPolling(500);

		return () => stopPolling();
	}, [result]);

	// Prepare show data.
	const show = result.data ? prepareShow(result.data?.showBy) : null;

	return [result, show];
};
