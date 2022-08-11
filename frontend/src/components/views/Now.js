import React from 'react';
import { Skeleton } from '@mui/material';

import ShowTable from 'components/common/ShowTable';
import { useLatestShow } from 'hooks/queries/use-latest-show';

export default function Now() {
	const { data, loading } = useLatestShow();

	return loading ? (
		<Skeleton animation="wave">
			<ShowTable />
		</Skeleton>
	) : (
		<ShowTable shows={data?.shows.nodes} buttonsDisabled={true} />
	);
}
