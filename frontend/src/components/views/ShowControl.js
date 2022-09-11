import React from 'react';
import { Paper, Grid, Stack, Skeleton } from '@mui/material';

import ViewHeading from 'components/common/ViewHeading';
import ShowTable from 'components/common/ShowTable';
import NextShowControl from 'components/common/NextShowControl';

import QRCode from 'components/common/QRCode';
import ShowNotes from 'components/common/ShowNotes';

import { useLatestShow } from 'hooks/queries/use-latest-show';

export default function ShowControl() {
	const [{ loading: showLoading }, show] = useLatestShow();

	return (
		<Grid container spacing={5}>
			{show ? (
				<Grid item xs={8}>
					<Stack spacing={2}>
						<ViewHeading variant="h6">Current Show</ViewHeading>
						{showLoading ? (
							<Skeleton>
								<ShowTable />
							</Skeleton>
						) : (
							<>
								<ShowTable shows={[show]} popoverDisabled />
								<ShowNotes show={show} editable={true} />
							</>
						)}
					</Stack>
				</Grid>
			) : null}
			<Grid item xs={4}>
				<Stack spacing={2}>
					{show ? (
						<>
							<ViewHeading variant="h6">QR Sign-in</ViewHeading>
							{show ? (
								<Paper sx={{ py: 3, px: 1, mb: 4 }}>
									<QRCode string={show.slug} />
								</Paper>
							) : null}
						</>
					) : null}
					<NextShowControl />
				</Stack>
			</Grid>
		</Grid>
	);
}
