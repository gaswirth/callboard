import React, { useContext, useState } from 'react';
import { Grid, Stack, Button, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import ViewHeading from '../common/ViewHeading';
import ShowTable from '../common/ShowTable';

import ProductionContext from '../../ProductionContext';
import { gql, useMutation } from '@apollo/client';
import Note from '../common/Note';
import { useShow } from '../../lib/hooks';

const MUTATE_CURRENT_SHOW = gql`
	mutation UpdateCurrentShow($input: UpdateSettingsInput!) {
		updateSettings(input: $input) {
			clientMutationId
			callboardOptionsSettings {
				currentShow
			}
		}
	}
`;

export default function Admin() {
	const {
		production: { currentShowId, previousShowId, shows },
	} = useContext(ProductionContext);

	// eslint-disable-next-line
	const [updateCurrentShowId, { data, loading, error }] = useMutation(MUTATE_CURRENT_SHOW);
	const currentShow = useShow(shows, currentShowId);
	const [newShowClicked, setNewShowClicked] = useState(false);

	// const handleCurrentShowIdSubmit = (event) => {
	// 	updateCurrentShowId({
	// 		variables: {
	// 			input: {
	// 				clientMutationId: 'currentShowSettingsMutation',
	// 				callboardOptionsSettingsCurrentShow: currentShowId,
	// 			},
	// 		},
	// 	});
	// };

	const handleStartNewShow = (event) => {
		setNewShowClicked(true);
	};

	const handleDateTimeChange = (newValue) => {
		// TODO mutation to add new show with datetime.
	};

	return (
		<Grid container spacing={5}>
			<Grid item xs={4}>
				<Stack spacing={2}>
					<ViewHeading variant="h6">Last Show</ViewHeading>
					<ShowTable showIds={[previousShowId]} buttonsEnabled={false} />
					<Note>{currentShow ? currentShow.notes : 'No notes.'}</Note>
				</Stack>
			</Grid>
			<Grid item xs={4}>
				<Stack spacing={2}>
					<ViewHeading variant="h6">This Show</ViewHeading>
					<ShowTable showIds={[currentShowId]} buttonsEnabled={true} />
					<Note>{currentShow && currentShow.notes ? currentShow.notes : 'No notes.'}</Note>
				</Stack>
			</Grid>
			<Grid item xs={4}>
				<Stack spacing={2}>
					<ViewHeading variant="h6">Options</ViewHeading>
					<Stack spacing={2}>
						<Button variant="contained" size="large" onClick={handleStartNewShow}>
							Start New Show
						</Button>
						{newShowClicked ? (
							<DateTimePicker
								label="Show Date and Time"
								value={new Date()}
								onChange={handleDateTimeChange}
								renderInput={(params) => <TextField {...params} />}
							/>
						) : null}
					</Stack>
				</Stack>
			</Grid>
		</Grid>
	);
}
