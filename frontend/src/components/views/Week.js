import React, { useContext, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { useQuery } from '@apollo/client';
import { prepareDateForRangeQuery } from '../../lib/functions';
import { QUERY_SHOWS_IN_RANGE } from '../../lib/gql';
import ShowTable from '../common/ShowTable';

import ProductionContext from '../../ProductionContext';

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
		pollInterval: 500,
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
