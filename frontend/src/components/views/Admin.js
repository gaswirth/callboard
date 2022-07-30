import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Grid, Stack, Button, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { formatISO } from 'date-fns';
import ViewHeading from '../common/ViewHeading';
import ShowTable from '../common/ShowTable';
import { MUTATE_CREATE_NEW_SHOW } from '../../lib/gql';

import ProductionContext from '../../ProductionContext';

export default function Admin() {
	const {
		production: { currentShowId, previousShowId },
	} = useContext(ProductionContext);

	// eslint-disable-next-line
	const [createNewShow, { data: newShowData, loading: newShowLoading, error: newShowError }] =
		useMutation(MUTATE_CREATE_NEW_SHOW);
	const [newShowClicked, setNewShowClicked] = useState(false);
	const [newShowDateTime, setNewShowDateTime] = useState('');

	const handleSubmitNewShow = () => {
		// TODO make sure date time is unique?

		// Run the mutation.
		createNewShow({
			variables: {
				datetime: formatISO(newShowDateTime),
			},
		});
	};

	const handleFinalizeShow = () => {};

	return (
		<Grid container spacing={5}>
			<Grid item xs={4}>
				<Stack spacing={2}>
					<ViewHeading variant="h6">Last Show</ViewHeading>
					<ShowTable showIds={[previousShowId]} />
				</Stack>
			</Grid>
			<Grid item xs={4}>
				<Stack spacing={2}>
					<ViewHeading variant="h6">This Show</ViewHeading>
					<ShowTable showIds={[currentShowId]} />
					{/* // TODO Finalize Show: mutation to set currentShow to next by `datetime`, and also update previous */}
					<Button variant="contained" size="large" onClick={handleFinalizeShow}>
						Finalize Show
					</Button>
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
									value={newShowDateTime || new Date()}
									onChange={(newValue) => setNewShowDateTime(newValue)}
									renderInput={(params) => <TextField {...params} />}
								/>
								<Button variant="contained" size="large" onClick={handleSubmitNewShow}>
									Confirm
								</Button>
							</>
						) : (
							<Button variant="contained" size="large" onClick={() => setNewShowClicked(true)}>
								Create New Show
							</Button>
						)}
					</Stack>
				</Stack>
			</Grid>
		</Grid>
	);
}
