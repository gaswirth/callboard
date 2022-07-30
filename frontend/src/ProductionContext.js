import { addDays, startOfWeek } from 'date-fns';
import { createContext } from 'react';
import { prepareShows, prepareRoster } from './lib/functions';

const ProductionContext = createContext({});
export default ProductionContext;

export const initialProduction = {
	name: '',
	shows: {},
	currentShowId: 0,
	previousShowId: 0,
	roster: {},
	view: {
		week: {
			range: {
				start: startOfWeek(new Date()),
				end: addDays(startOfWeek(new Date()), 7),
			},
		},
	},
};

export function productionReducer(state, action) {
	switch (action.type) {
		case 'SET_ROSTER': {
			const { payload } = action;

			const roster = prepareRoster(payload);

			return {
				...state,
				roster,
			};
		}

		case 'SET_SHOWS': {
			const { payload } = action;

			const shows = prepareShows(payload);

			// Merges the incoming shows payload with existing data (overwriting existing).
			return {
				...state,
				shows: {
					...state.shows,
					...shows,
				},
			};
		}

		case 'SET_CURRENT_PREVIOUS_SHOW_ID': {
			const { currentShowId, previousShowId } = action;

			return {
				...state,
				currentShowId,
				previousShowId,
			};
		}

		case 'SET_ATTENDANCE_STATUS': {
			const { showId, companyMemberId, status } = action;

			return {
				...state,
				shows: {
					...state.shows,
					[showId]: {
						...state.shows[showId],
						attendance: {
							...state.shows[showId].attendance,
							[companyMemberId]: status,
						},
					},
				},
			};
		}

		case 'SET_WEEK_RANGE': {
			const { start, end } = action;

			return {
				...state,
				view: {
					...state.view,
					week: {
						...state.view.week,
						range: {
							start: start,
							end: end,
						},
					},
				},
			};
		}

		case 'SET_SHOW_NOTES': {
			const { notes, showId } = action;

			return {
				...state,
				shows: {
					...state.shows,
					[showId]: {
						...state.shows[showId],
						notes: notes,
					},
				},
			};
		}

		default:
			return state;
	}
}
