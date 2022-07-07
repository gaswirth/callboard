import { createContext } from 'react';
import { prepareShows, prepareRoster } from './lib/functions';

const ProductionContext = createContext({});
export default ProductionContext;

export const initialProduction = {
	name: '',
	shows: {},
	currentShowId: 0,
	roster: {},
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

		case 'SET_CURRENT_SHOW_ID': {
			const { id } = action;

			return {
				...state,
				currentShowId: id,
			};
		}

		case 'SET_ATTENDANCE_STATUS': {
			const { showId, performerId, status } = action;

			return {
				...state,
				shows: {
					...state.shows,
					[showId]: {
						...state.shows[showId],
						attendance: {
							...state.shows[showId].attendance,
							[performerId]: status,
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
