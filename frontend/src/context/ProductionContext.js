import { createContext, useReducer } from 'react';
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

export const ProductionProvider = ({ children }) => {
	const [production, productionDispatch] = useReducer(productionReducer, initialProduction);

	return <ProductionContext.Provider value={{ production, productionDispatch }}>{children}</ProductionContext.Provider>;
};
