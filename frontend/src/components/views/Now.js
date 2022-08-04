import React from 'react';
import { useQuery } from '@apollo/client';
import ShowTable from '../common/ShowTable';
import { QUERY_LATEST_SHOW } from '../../lib/gql';
import { isEmpty } from 'lodash';

export default function Now() {
	const { data, loading, error } = useQuery(QUERY_LATEST_SHOW, {
		pollInterval: 500,
	});

	return !isEmpty(data) ? <ShowTable shows={data?.shows.nodes} /> : null;
}
