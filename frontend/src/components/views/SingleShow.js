import React from 'react';
import { Container, Skeleton } from '@mui/material';

import ShowTable from 'components/common/ShowTable';
import ViewHeading from 'components/common/ViewHeading';
import ShowNotes from 'components/common/ShowNotes';

import { useShowBySlug } from 'hooks/queries/use-show-by-slug';
import { useCompanyName } from 'hooks/queries/use-company-name';

export default function SingleShow({ slug }) {
	const { data: showData, loading: showLoading } = useShowBySlug(slug);
	const { data: companyData } = useCompanyName();

	const companyName = companyData?.callboardOptionsSettings.callboardCompanyName;
	const show = showData?.showBy;

	return showLoading ? (
		<Skeleton animation="wave">
			<ShowTable />
		</Skeleton>
	) : (
		<Container>
			<ViewHeading>{companyName}</ViewHeading>
			<ShowTable shows={[show]} iconButtonsDisabled={true} popoverDisabled={true} />
			<ShowNotes show={show} />
		</Container>
	);
}
