/**
 * useBenchedRoster hook. Query to retrieve all users except those in the specified subset.
 *
 * Used to retrieve "benched" performers (those not currently listed in a show's `attendance` meta);
 */

import { gql, useQuery } from '@apollo/client';
import { prepareRoster } from 'lib/functions';
import { useMemo } from 'react';

export const QUERY_BENCH = gql`
	query Bench($excludes: [ID!]) {
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

export const useBenchedRoster = (ids) => {
	const result = useQuery(QUERY_BENCH, {
		variables: {
			excludes: ids ? ids : null,
		},
	});

	const roster = useMemo(() => {
		if (!result.data) return;

		const {
			data: { companyMembersExcluding },
		} = result;

		return prepareRoster(companyMembersExcluding);
	}, [result]);

	return { ...result, roster };
};
