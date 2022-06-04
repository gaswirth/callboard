import { createContext } from 'react';
import { Show } from '../lib/classes';

const ShowContext = createContext({});
export default ShowContext;

export const initialShow = {
	name: '',
	shows: {},
	currentShow: new Show(),
	roster: {},
};

export function showReducer(state, action) {
	switch (action.type) {
		case 'INIT':
			const { name, shows, currentShow, roster } = action;

			return {
				...state,
				shows,
				name,
				currentShow,
				roster,
			};

		default:
			return state;
	}
}
