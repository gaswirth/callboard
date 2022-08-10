import { gql, useQuery } from '@apollo/client';

export const QUERY_ROSTER = gql`
	query Roster {
		companyMembers {
			role
			name
			companyMemberId
		}
	}
`;

export const useRoster = () => {
	return useQuery(QUERY_ROSTER);
};
