import React, { useEffect, useState } from 'react';
import { Grid, Stack, Button, TextField, Skeleton, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import ViewHeading from 'components/common/ViewHeading';
import ShowTable from 'components/common/ShowTable';

import { useRecentShows } from 'hooks/queries/use-recent-shows';
import { useNewShow } from 'hooks/mutations/use-new-show';

export default function Admin() {
	const { data: showData, loading: showLoading } = useRecentShows();
	const { newShowMutation } = useNewShow();

	const [newShowClicked, setNewShowClicked] = useState(false);
	const [newShowDateTime, setNewShowDateTime] = useState(null);
	const [newShowTitle, setNewShowTitle] = useState('');
	const [newShowError, setNewShowError] = useState('');

	/**
	 * Clear any error messages when trying a new date.
	 */
	useEffect(() => {
		if (newShowDateTime && newShowError) setNewShowError('');
	}, [newShowDateTime, newShowError]);

	/**
	 * Open the New Show dialog.
	 */
	const handleNewShowClick = () => {
		setNewShowClicked(true);
	};

	const handleDateTimePickerChange = (value) => {
		setNewShowDateTime(value);
	};

	/**
	 * Fire the mutation to create a new Show.
	 */
	const handleSubmitNewShow = () => {
		newShowMutation(newShowDateTime, newShowTitle).catch((errors) => setNewShowError(errors.message));

		// Clear the new show fields.
		setNewShowDateTime(null);
		setNewShowTitle('');
	};

	return (
		<Grid container spacing={5}>
			{showData?.shows.nodes[1] ? (
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
			) : null}
			{showData?.shows.nodes[0] ? (
				<Grid item xs={4}>
					<Stack spacing={2}>
						<ViewHeading variant="h6">Current Show</ViewHeading>
						{showLoading ? (
							<Skeleton>
								<ShowTable />
							</Skeleton>
						) : (
							<ShowTable shows={[showData.shows.nodes[0]]} />
						)}
					</Stack>
				</Grid>
			) : null}
			<Grid item xs={4}>
				<Stack spacing={2}>
					<ViewHeading variant="h6">Actions</ViewHeading>
					<Stack spacing={2}>
						{newShowClicked ? (
							<>
								<DateTimePicker
									label="Show Date and Time"
									value={newShowDateTime}
									onChange={handleDateTimePickerChange}
									renderInput={(params) => <TextField {...params} />}
								/>
								{newShowError ? (
									<Typography variant="caption" color="warning.main" sx={{ mt: 0, lineHeight: 1 }}>
										{newShowError}
									</Typography>
								) : null}
								<TextField
									label="Next Show Number/ID"
									variant="outlined"
									value={newShowTitle}
									onChange={(event) => setNewShowTitle(event.target.value)}
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
							<Button variant="contained" size="large" onClick={handleNewShowClick}>
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
	);
}
