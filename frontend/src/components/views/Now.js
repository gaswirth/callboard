import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import ShowTable from '../common/ShowTable';
import { QUERY_LATEST_SHOW } from '../../lib/gql';
import { isEmpty } from 'lodash';

export default function Now() {
	const { data, loading, error, startPolling, stopPolling } = useQuery(QUERY_LATEST_SHOW);

	/**
	 * Manually run startPolling
	 *
	 * @see {@link https://github.com/apollographql/apollo-client/issues/9819}
	 */
	useEffect(() => {
		if (isEmpty(data)) return;

		startPolling(500);

		return () => stopPolling();
	}, [data, startPolling, stopPolling]);

	// TODO buttonsEnabled only with privileges
	return !isEmpty(data) ? <ShowTable shows={data?.shows.nodes} buttonsEnabled={true} /> : null;
}
