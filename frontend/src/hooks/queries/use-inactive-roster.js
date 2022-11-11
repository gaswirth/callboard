/**
 * useInctiveRoster hook. Query to retrieve "inactive" Company Members.
 */

import { gql, useQuery } from '@apollo/client';
import { prepareRoster } from 'lib/functions';
// import { useMemo } from 'react';

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

	// TODO evaluate useMemo necessity
	const roster = useMemo(() => {
		if (!result.data) return;

		const {
			data: { activeCompanyMembers },
		} = result;

		return prepareRoster(activeCompanyMembers);
	}, [result]);

	// const roster =
	// 	result.data.inactiveCompanyMembers.length > 0 ? prepareRoster(result.data.inactiveCompanyMembers) : null;

	return { ...result, roster };
};
