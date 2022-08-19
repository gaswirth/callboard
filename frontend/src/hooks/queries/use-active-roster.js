/**
 * useActiveRoster hook. Query to retrieve Company Members.
 */

import { gql, useQuery } from '@apollo/client';
import { prepareRoster } from 'lib/functions';
import { useMemo } from 'react';

export const QUERY_ACTIVE_ROSTER = gql`
	query ActiveRoster {
		activeCompanyMembers {
			id
			firstName
			lastName
			role
			active
		}
	}
`;

export const useActiveRoster = () => {
	const result = useQuery(QUERY_ACTIVE_ROSTER);

	const roster = useMemo(() => {
		if (!result.data) return;

		const {
			data: { activeCompanyMembers },
		} = result;

		return prepareRoster(activeCompanyMembers);
	}, [result]);

	return { ...result, preparedData: roster };
};
