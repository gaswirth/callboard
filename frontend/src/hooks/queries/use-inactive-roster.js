/**
 * useInactiveRoster hook. Query to retrieve Company Members.
 *
 * // MAYBE Determine need for this hook.
 */

import { gql, useQuery } from '@apollo/client';
import { prepareRoster } from 'lib/functions';
import { useMemo } from 'react';

export const QUERY_INACTIVE_ROSTER = gql`
	query InactiveRoster {
		inactiveCompanyMembers {
			id
			firstName
			lastName
			role
			active
		}
	}
`;

export const useInactiveRoster = () => {
	const result = useQuery(QUERY_INACTIVE_ROSTER);

	const roster = useMemo(() => {
		if (!result.data) return;

		const {
			data: { inactiveCompanyMembers },
		} = result;

		return prepareRoster(inactiveCompanyMembers);
	}, [result]);

	return { ...result, roster };
};
