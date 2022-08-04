// import { addDays, startOfWeek } from 'date-fns';
import { createContext } from 'react';
import { prepareRoster } from './lib/functions';

const ProductionContext = createContext({});
export default ProductionContext;

export const initialProduction = {
	name: '',
	shows: {},
	roster: {},
	currentShowId: 0,
};

// TODO audit all cases and trim the fat.

export function productionReducer(state, action) {
	switch (action.type) {
		case 'INIT': {
			const { name, roster, currentShowId } = action;

			return {
				...state,
				name,
				roster: prepareRoster(roster),
				currentShowId,
			};
		}

		default:
			return state;
	}
}
