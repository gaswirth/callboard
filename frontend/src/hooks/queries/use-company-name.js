import { gql, useQuery } from '@apollo/client';

export const QUERY_COMPANY_NAME = gql`
	query GetCompanyName {
		callboardOptionsSettings {
			callboardCompanyName
		}
	}
`;

export const useCompanyName = () => {
	return useQuery(QUERY_COMPANY_NAME);
};
