/**
 * useRecentShows hook. Queries the most recent show (by date).
 */

import { gql, useQuery } from '@apollo/client';
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

	// Prepare show data.
	const shows = result.data ? result.data.shows.nodes.map((item) => prepareShow(item)) : null;

	return [result, shows];
};
