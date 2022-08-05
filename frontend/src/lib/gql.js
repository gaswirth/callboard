/**
 * GraphQL Queries.
 */

import { gql } from '@apollo/client';

export const QUERY_INIT = gql`
	query Init {
		shows(first: 8) {
			nodes {
				id
				databaseId
			}
		}
		companyMembers {
			callboardRole
			name
			companyMemberId
		}
	}
`;

export const QUERY_COMPANY_NAME = gql`
	query GetCompanyName {
		callboardOptionsSettings {
			companyName
		}
	}
`;

export const QUERY_RECENT_SHOWS = gql`
	query RecentShows($last: Int = 8) {
		shows(first: $last) {
			nodes {
				id
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
				id
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

export const MUTATE_UPDATE_SHOW_ATTENDANCE = gql`
	mutation UpdateShowAttendance($input: UpdateShowAttendanceInput!) {
		updateShowAttendance(input: $input) {
			clientMutationId
			newStatus
		}
	}
`;

export const MUTATE_UPDATE_COMPANY_NAME = gql`
	mutation UpdateCompanyName($input: UpdateSettingsInput!) {
		updateSettings(input: $input) {
			clientMutationId
			callboardOptionsSettings {
				companyName
			}
		}
	}
`;
