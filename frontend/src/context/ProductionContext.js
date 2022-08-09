import { createContext } from 'react';
import { prepareRoster } from 'lib/functions';

const ProductionContext = createContext({});
export default ProductionContext;

export const initialProduction = {
	roster: {},
};

export function productionReducer(state, action) {
	switch (action.type) {
		case 'SET_ROSTER': {
			const { roster } = action;

			return {
				...state,
				roster: prepareRoster(roster),
			};
		}

		default:
			return state;
	}
}
