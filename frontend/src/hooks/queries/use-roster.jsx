/**
 * useRoster hook. Query to retrieve Company Members.
 */

import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';

import { prepareRoster } from '@/lib/functions';

export const QUERY_ROSTER = gql`
	query Roster($ids: [ID] = []) {
		companyMembers(ids: $ids) {
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

export const useRoster = ({ ids } = {}) => {
	const result = useQuery(QUERY_ROSTER, {
		variables: {
			ids: ids ? ids : [],
		},
	});

	/**
	 * Memoize the prepared roster value
	 */
	const roster = useMemo(() => {
		if (!result.data) return;

		const {
			data: { companyMembers },
		} = result;

		return prepareRoster(companyMembers);
	}, [result]);

	return [result, roster];
};
