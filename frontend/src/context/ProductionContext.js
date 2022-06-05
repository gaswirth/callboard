import { createContext } from 'react';

const ProductionContext = createContext({});
export default ProductionContext;

export const initialProduction = {
	name: '',
	shows: {},
	currentShow: 0,
	roster: {},
};

export function productionReducer(state, action) {
	switch (action.type) {
		case 'INIT': {
			const { name, shows, currentShow, roster } = action;

			return {
				...state,
				shows,
				name,
				currentShow,
				roster,
			};
		}

		case 'SET_ATTENDANCE': {
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

		default:
			return state;
	}
}
