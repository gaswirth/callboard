/**
 * useRoster hook. Query to retrieve Company Members.
 */

import { gql, useQuery } from '@apollo/client';
import { prepareRoster } from 'lib/functions';
import { useMemo } from 'react';

export const QUERY_ROSTER = gql`
	query Roster {
		companyMembers {
			id
			firstName
			lastName
			role
		}
	}
`;

export const useRoster = () => {
	const result = useQuery(QUERY_ROSTER);

	const roster = useMemo(() => {
		if (!result.data) return;

		const {
			data: { companyMembers },
		} = result;

		return prepareRoster(companyMembers);
	}, [result]);

	return { ...result, preparedData: roster };
};
