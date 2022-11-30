/**
 * useRosterExcluding hook. Query to retrieve all users except those in the specified subset.
 */

import { gql, useQuery } from '@apollo/client';
import { prepareRoster } from 'lib/functions';
import { useMemo } from 'react';

export const QUERY_ROSTER_EXCLUDING = gql`
	query RosterExcluding($excludes: [ID!]) {
		companyMembersExcluding(excludes: $excludes) {
			id
			username
			firstName
			lastName
			email
			role
			active
		}
	}
`;

export const useRosterExcluding = (ids) => {
	const result = useQuery(QUERY_ROSTER_EXCLUDING, {
		variables: {
			excludes: ids ? ids : null,
		},
	});

	/**
	 * Memoize the prepared roster value
	 */
	const rosterExcluding = useMemo(() => {
		if (!result.data) return;

		const {
			data: { companyMembersExcluding },
		} = result;

		return prepareRoster(companyMembersExcluding);
	}, [result]);

	return [result, rosterExcluding];
};
