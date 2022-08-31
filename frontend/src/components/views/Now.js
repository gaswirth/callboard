import React from 'react';
import { Container, Skeleton } from '@mui/material';

import ShowTable from 'components/common/ShowTable';
import ViewHeading from 'components/common/ViewHeading';
import ShowNotes from 'components/common/ShowNotes';

import { useLatestShow } from 'hooks/queries/use-latest-show';
import { useCompanyName } from 'hooks/queries/use-company-name';

export default function Now() {
	const { data: showData, loading: showLoading } = useLatestShow();
	const { data: companyData } = useCompanyName();

	const companyName = companyData?.callboardOptionsSettings.callboardCompanyName;
	const show = showData?.shows.nodes[0];

	return showLoading ? (
		<Skeleton animation="wave">
			<ShowTable />
		</Skeleton>
	) : (
		<Container>
			<ViewHeading>{companyName}</ViewHeading>
			<ShowTable shows={[show]} buttonsDisabled={true} />
			<ShowNotes show={show} />
		</Container>
	);
}
