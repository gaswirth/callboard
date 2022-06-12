import { createContext } from 'react';

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
		case 'INIT': {
			const { name, shows, currentShowId, roster } = action;

			return {
				...state,
				shows,
				name,
				currentShowId,
				roster,
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
