import { gql, useQuery } from '@apollo/client';
import { isEmpty } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { prepareDateForRangeQuery } from '../../lib/functions';

import ProductionContext from '../../ProductionContext';
import ShowTable from '../common/ShowTable';

const QUERY_SHOWS_IN_RANGE = gql`
	query ShowsInRange($rangeStart: String, $rangeEnd: String) {
		shows(where: { showsAfter: $rangeStart, showsBefore: $rangeEnd, orderby: { field: TITLE, order: ASC } }) {
			nodes {
				databaseId
				showData {
					datetime
				}
			}
		}
	}
`;

export default function Week() {
	const {
		production: {
			view: {
				week: {
					range: { start, end },
				},
			},
		},
	} = useContext(ProductionContext);

	const [rangeStart, setRangeStart] = useState('');
	const [rangeEnd, setRangeEnd] = useState('');
	const [rangeShows, setRangeShows] = useState([]);

	const { data, loading /*error*/ } = useQuery(QUERY_SHOWS_IN_RANGE, {
		variables: { rangeStart, rangeEnd },
		// pollInterval: 500,
	});

	/**
	 * Update the current range in context.
	 */
	useEffect(() => {
		// TODO ultimately, update the context when next/prev week buttons are clicked.
		if (start) setRangeStart(prepareDateForRangeQuery(start));
		if (end) setRangeEnd(prepareDateForRangeQuery(end));
	}, [start, end]);

	/**
	 * Prepare the shows.
	 */
	// TODO Maybe memoize?
	useEffect(() => {
		if (isEmpty(data)) return;

		setRangeShows(
			data.shows.nodes.map((show) => {
				return show.databaseId;
			})
		);
	}, [data]);

	return !isEmpty(rangeShows) ? <ShowTable showIds={rangeShows} /> : loading ? <div>Loading</div> : '';
}
