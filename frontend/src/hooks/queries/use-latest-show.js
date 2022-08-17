/**
 * useLastestShow hook. Queries the show with the most recent `datetime`.
 */

import { useEffect } from 'react';
import { isEmpty } from 'lodash';
import { gql, useQuery } from '@apollo/client';

export const QUERY_LATEST_SHOW = gql`
	query LatestShow {
		shows(first: 1) {
			nodes {
				id
				databaseId
				datetime
				attendance
			}
		}
	}
`;

export const useLatestShow = () => {
	const result = useQuery(QUERY_LATEST_SHOW);

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
