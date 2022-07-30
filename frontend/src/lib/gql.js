/**
 * GraphQL Queries.
 */

import { gql } from '@apollo/client';

export const QUERY_IMMEDIATE_POST_IDS = gql`
	query CurrentPreviousShowIds($showsBefore: String) {
		callboardOptionsSettings {
			currentShow
		}
		shows(where: { showsBefore: $showsBefore }, last: 1) {
			nodes {
				databaseId
			}
		}
	}
`;

export const QUERY_ROSTER = gql`
	query CompanyMembers {
		companyMembers {
			callboardRole
			name
			companyMemberId
		}
	}
`;

export const QUERY_SHOWS = gql`
	query Shows($showIds: [ID] = "") {
		shows(where: { in: $showIds }) {
			nodes {
				databaseId
				datetime
				attendance
			}
		}
	}
`;

export const QUERY_SHOWS_IN_RANGE = gql`
	query ShowsInRange($rangeStart: String, $rangeEnd: String) {
		shows(where: { showsAfter: $rangeStart, showsBefore: $rangeEnd, orderby: { field: TITLE, order: ASC } }) {
			nodes {
				databaseId
				datetime
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
