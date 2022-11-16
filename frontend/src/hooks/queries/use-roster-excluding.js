/**
 * useRosterExcluding hook. Query to retrieve all users except those in the specified subset.
 */

import { gql, useQuery } from '@apollo/client';
import { prepareRoster } from 'lib/functions';
import { useMemo } from 'react';

export const QUERY_ROSTER_EXCLUDING = gql`
	query RosterExcluding($excludes: [ID!]) {
		companyMembersExcluding(excludes: $excludes) {
			active
			email
			firstName
			id
			lastName
			role
		}
	}
`;

export const useRosterExcluding = (ids) => {
	const result = useQuery(QUERY_ROSTER_EXCLUDING, {
		variables: {
			excludes: ids ? ids : null,
		},
	});

	// TODO evaluate useMemo
	const roster = useMemo(() => {
		if (!result.data) return;

		const {
			data: { companyMembersExcluding },
		} = result;

		return prepareRoster(companyMembersExcluding);
	}, [result]);

	// let roster = '';
	// if (result.data) {
	// 	roster = prepareRoster(result.data.companyMembersExcluding);
	// }

	return { ...result, roster };
};