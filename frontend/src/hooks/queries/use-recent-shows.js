import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { isEmpty } from 'lodash';

export const QUERY_RECENT_SHOWS = gql`
	query RecentShows($last: Int = 8) {
		shows(first: $last) {
			nodes {
				id
				databaseId
				datetime
				attendance
			}
		}
	}
`;

export const useRecentShows = () => {
	const result = useQuery(QUERY_RECENT_SHOWS);

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

	return result;
};
