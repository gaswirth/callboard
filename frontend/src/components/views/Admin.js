import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { useMutation, useQuery } from '@apollo/client';
import { Grid, Stack, Button, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { formatISO } from 'date-fns';
import ViewHeading from '../common/ViewHeading';
import ShowTable from '../common/ShowTable';
import {
	QUERY_RECENT_SHOWS,
	MUTATE_CREATE_NEW_SHOW,
	MUTATE_UPDATE_COMPANY_NAME,
	QUERY_COMPANY_NAME,
} from '../../lib/gql';

export default function Admin() {
	const {
		data: showData,
		loading: loadingData,
		error: errorData,
		startPolling: showStartPolling,
		stopPolling: showStopPolling,
	} = useQuery(QUERY_RECENT_SHOWS);

	const { data: companyNameData, loading: companyNameLoading, error: companyNameError } = useQuery(QUERY_COMPANY_NAME);

	const [createNewShow, { data: newShowData, loading: newShowLoading, error: newShowError }] =
		useMutation(MUTATE_CREATE_NEW_SHOW);

	const [
		updateCompanyName,
		{ data: updateCompanyNameData, loading: updateCompanyNameLoading, error: updateCompanyNameError },
	] = useMutation(MUTATE_UPDATE_COMPANY_NAME);

	const [showCount, setShowCount] = useState(0);
	const [newShowClicked, setNewShowClicked] = useState(false);
	const [newShowDateTime, setNewShowDateTime] = useState(null);
	const [renameCompanyClicked, setRenameCompanyClicked] = useState(false);
	const [companyName, setCompanyName] = useState(null);

	/**
	 * Manually run startPolling
	 *
	 * @see {@link https://github.com/apollographql/apollo-client/issues/9819}
	 */
	useEffect(() => {
		if (isEmpty(showData)) return;

		showStartPolling(500);

		return () => showStopPolling();
	}, [showData, showStartPolling, showStopPolling]);

	/**
	 * Store the number of shows retrieved.
	 */
	useEffect(() => {
		if (showData?.shows.nodes.length > 0) setShowCount(showData.shows.nodes.length);
	}, [showData?.shows.nodes]);

	/**
	 *
	 */
	useEffect(() => {
		// Only run once.
		if (companyName) return;

		setCompanyName(companyNameData?.callboardOptionsSettings.companyName);

		// Run Once
		// eslint-disable-next-line
	}, []);

	/**
	 * Fire the mutation to create a new Show.
	 */
	const handleSubmitNewShow = () => {
		// TODO make sure date time is unique?
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

	/**
	 * Fire the mutation to update the Company Name.
	 */
	const handleSubmitCompanyName = () => {
		updateCompanyName({
			variables: {
				input: {
					clientMutationId: 'updateCompanyNameMutation',
					callboardOptionsSettingsCompanyName: companyName,
				},
			},
			refetchQueries: [{ query: QUERY_COMPANY_NAME }, 'GetCompanyName'],
		});

		if (!companyNameLoading && !companyNameError) {
			setCompanyName('');
			setRenameCompanyClicked(false);
		}
	};

	/**
	 * Cancel renaming Company Name.
	 */
	const handleResetRenameCompanyName = () => {
		setCompanyName('');
		setRenameCompanyClicked(false);
	};

	return showCount > 0 ? (
		<Grid container spacing={5}>
			<Grid item xs={4}>
				<Stack spacing={2}>
					<ViewHeading variant="h6">Last Show</ViewHeading>
					<ShowTable shows={[showData.shows.nodes[1]]} buttonsEnabled={true} />
				</Stack>
			</Grid>
			<Grid item xs={4}>
				<Stack spacing={2}>
					<ViewHeading variant="h6">This Show</ViewHeading>
					<ShowTable shows={[showData.shows.nodes[0]]} buttonsEnabled={true} />
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
								Start New Show
							</Button>
						)}
					</Stack>
					<Stack spacing={2}>
						{renameCompanyClicked ? (
							<>
								<TextField label="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
								<Button variant="contained" onClick={handleSubmitCompanyName}>
									Save
								</Button>
								<Button variant="outline" onClick={handleResetRenameCompanyName}>
									Cancel
								</Button>
							</>
						) : (
							<Button variant="outlined" size="medium" onClick={() => setRenameCompanyClicked(true)}>
								{/* TODO Authentication! */}
								Change Show Name (NEEDS AUTH TO WORK)
							</Button>
						)}
					</Stack>
				</Stack>
			</Grid>
			<Grid item xs={12}>
				<ShowTable shows={showData.shows.nodes.slice(2)} buttonsEnabled={true} />
			</Grid>
		</Grid>
	) : (
		''
	);
}
