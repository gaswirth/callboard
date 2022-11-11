/**
 * useActiveRoster hook. Query to retrieve "active" Company Members.
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

	// TODO evaluate useMemo necessity
	const roster = useMemo(() => {
		if (!result.data) return;

		const {
			data: { activeCompanyMembers },
		} = result;

		return prepareRoster(activeCompanyMembers);
	}, [result]);

	// const roster = result.data.activeCompanyMembers.length > 0 ? prepareRoster(result.data.activeCompanyMembers) : null;

	return { ...result, roster };
};
