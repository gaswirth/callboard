/**
 * useRecentShows hook. Queries the most recent show.
 */

import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { isEmpty } from 'lodash';

export const QUERY_RECENT_SHOWS = gql`
	query RecentShows($last: Int = 8) {
		shows(first: $last) {
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

export const useRecentShows = () => {
	const result = useQuery(QUERY_RECENT_SHOWS);
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

	return result;
};
