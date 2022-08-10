import React, { useEffect, useState } from 'react';
import { Grid, Stack, Button, TextField, Skeleton } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import ViewHeading from 'components/common/ViewHeading';
import ShowTable from 'components/common/ShowTable';
import { useRecentShows } from 'hooks/queries/use-recent-shows';
import { useNewShow } from 'hooks/mutations/use-new-show';

export default function Admin() {
	const { data: showData, loading: showLoading } = useRecentShows();
	const { newShowMutation } = useNewShow();

	const [showCount, setShowCount] = useState(0);
	const [newShowClicked, setNewShowClicked] = useState(false);
	const [newShowDateTime, setNewShowDateTime] = useState(null);

	/**
	 * Store the number of shows retrieved.
	 */
	useEffect(() => {
		if (showData?.shows.nodes.length > 0) setShowCount(showData.shows.nodes.length);
	}, [showData?.shows.nodes]);

	/**
	 * Fire the mutation to create a new Show.
	 */
	const handleSubmitNewShow = () => {
		newShowMutation(newShowDateTime);

		// Clear the dateTime field.
		setNewShowDateTime(null);
	};

	return showCount > 0 ? (
		<Grid container spacing={5}>
			<Grid item xs={4}>
				<Stack spacing={2}>
					<ViewHeading variant="h6">Last Show</ViewHeading>
					{showLoading ? (
						<Skeleton>
							<ShowTable />
						</Skeleton>
					) : (
						<ShowTable shows={[showData.shows.nodes[1]]} />
					)}
				</Stack>
			</Grid>
			<Grid item xs={4}>
				<Stack spacing={2}>
					<ViewHeading variant="h6">This Show</ViewHeading>
					{showLoading ? (
						<Skeleton>
							<ShowTable />
						</Skeleton>
					) : (
						<ShowTable shows={[showData.shows.nodes[0]]} />
					)}
				</Stack>
			</Grid>
			<Grid item xs={4}>
				<Stack spacing={2}>
					<ViewHeading variant="h6">Actions</ViewHeading>
					<Stack spacing={2}>
						{newShowClicked ? (
							<>
								<DateTimePicker
									label="Show Date and Time"
									value={newShowDateTime}
									onChange={(newValue) => setNewShowDateTime(newValue)}
									renderInput={(params) => <TextField {...params} />}
								/>
								<Button
									variant="contained"
									size="large"
									onClick={handleSubmitNewShow}
									disabled={newShowDateTime ? false : true}
								>
									Confirm
								</Button>
							</>
						) : (
							<Button variant="contained" size="large" onClick={() => setNewShowClicked(true)}>
								Start New Show
							</Button>
						)}
					</Stack>
				</Stack>
			</Grid>
			<Grid item xs={12}>
				{showLoading ? (
					<Skeleton>
						<ShowTable />
					</Skeleton>
				) : (
					<ShowTable shows={showData.shows.nodes.slice(2)} />
				)}
			</Grid>
		</Grid>
	) : (
		''
	);
}
