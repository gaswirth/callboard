/**
 * useRecentShows hook. Queries the most recent show (by date).
 */

import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { isEmpty } from 'lodash';
import { prepareShow } from 'lib/functions';

export const QUERY_RECENT_SHOWS = gql`
	query RecentShows($last: Int = 8, $notIn: [ID] = "") {
		shows(first: $last, where: { notIn: $notIn }) {
			nodes {
				databaseId
				datetime
				attendance
				notes
				slug
			}
		}
	}
`;

export const useRecentShows = (count, notIn = []) => {
	const result = useQuery(QUERY_RECENT_SHOWS, {
		variables: {
			last: count ? count : null,
			notIn,
		},
	});
	const { data, startPolling, stopPolling } = result;

	/**
	 * Manually run startPolling.
	 *
	 * @see {@link https://github.com/apollographql/apollo-client/issues/9819}
	 */
	useEffect(() => {
		if (isEmpty(data)) return;

		startPolling(500);

		return () => stopPolling();
	}, [data, startPolling, stopPolling]);

	// Prepare show data.
	const shows = result.data ? result.data.shows.nodes.map((item) => prepareShow(item)) : null;

	return [result, shows];
};
