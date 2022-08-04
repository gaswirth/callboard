/**
 * GraphQL Queries.
 */

import { gql } from '@apollo/client';

export const QUERY_INIT = gql`
	query Init {
		shows(first: 1) {
			nodes {
				databaseId
			}
		}
		callboardOptionsSettings {
			companyTitle
		}
		companyMembers {
			callboardRole
			name
			companyMemberId
		}
	}
`;

export const QUERY_RECENT_SHOWS = gql`
	query RecentShows($last: Int = 8) {
		shows(first: $last) {
			nodes {
				databaseId
				datetime
				attendance
			}
		}
	}
`;

export const QUERY_LATEST_SHOW = gql`
	query LatestShow {
		shows(first: 1) {
			nodes {
				databaseId
				datetime
				attendance
			}
		}
	}
`;

export const MUTATE_CREATE_NEW_SHOW = gql`
	mutation CreateNewShow($input: CreateNewShowInput!) {
		createNewShow(input: $input) {
			clientMutationId
			newShowId
		}
	}
`;
