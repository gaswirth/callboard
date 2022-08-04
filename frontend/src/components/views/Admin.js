import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Grid, Stack, Button, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { formatISO } from 'date-fns';
import ViewHeading from '../common/ViewHeading';
import ShowTable from '../common/ShowTable';
import { QUERY_RECENT_SHOWS, MUTATE_CREATE_NEW_SHOW } from '../../lib/gql';

export default function Admin() {
	const [createNewShow, { data: newShowData, loading: newShowLoading, error: newShowError }] =
		useMutation(MUTATE_CREATE_NEW_SHOW);
	const {
		data: showData,
		loading: loadingData,
		error: errorData,
	} = useQuery(QUERY_RECENT_SHOWS, {
		pollInterval: 500,
	});
	const [showCount, setShowCount] = useState(0);
	const [newShowClicked, setNewShowClicked] = useState(false);
	const [newShowDateTime, setNewShowDateTime] = useState(null);

	// Store the number of shows retrieved.
	useEffect(() => {
		if (showData?.shows.nodes.length > 0) setShowCount(showData.shows.nodes.length);
	}, [showData?.shows.nodes]);

	const handleSubmitNewShow = () => {
		// TODO make sure date time is unique?

		// Run the mutation.
		createNewShow({
			variables: {
				input: {
					clientMutationId: 'createNewShowMutation',
					datetime: formatISO(newShowDateTime),
				},
			},
		});

		// Clear the dateTime field.
		setNewShowDateTime(null);
	};

	return showCount > 0 ? (
		<Grid container spacing={5}>
			<Grid item xs={4}>
				<Stack spacing={2}>
					<ViewHeading variant="h6">Last Show</ViewHeading>
					<ShowTable shows={[showData.shows.nodes[1]]} />
				</Stack>
			</Grid>
			<Grid item xs={4}>
				<Stack spacing={2}>
					<ViewHeading variant="h6">This Show</ViewHeading>
					<ShowTable shows={[showData.shows.nodes[0]]} />
				</Stack>
			</Grid>
			<Grid item xs={4}>
				<Stack spacing={2}>
					<ViewHeading variant="h6">Options</ViewHeading>
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
								New Show
							</Button>
						)}
					</Stack>
				</Stack>
			</Grid>
			<Grid item xs={12}>
				<ShowTable shows={showData.shows.nodes.slice(2)} />
			</Grid>
		</Grid>
	) : (
		''
	);
}
