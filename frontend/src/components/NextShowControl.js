import React, { useEffect, useReducer } from 'react';
import { Stack, Typography, ButtonGroup, Button, TextField, Paper } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { useNewShow } from 'hooks/mutations/use-new-show';

const initialNewShow = {
	dialogOpen: false,
	datetime: '',
	title: '',
	notes: '',
	error: '',
	save: false,
};

function newShowReducer(state, action) {
	switch (action.type) {
		case 'OPEN':
			return {
				...state,
				dialogOpen: true,
			};

		case 'ONCHANGE':
			return {
				...state,
				[action.name]: action.value,
			};

		case 'ERROR': {
			return {
				...state,
				error: action.error,
			};
		}

		case 'CLEAR_ERRORS': {
			return {
				...state,
				error: '',
			};
		}

		case 'SAVE':
			return { ...state, save: true };

		case 'CLEAR':
		default:
			return initialNewShow;
	}
}

export default function NextShowControl() {
	const { newShowMutation } = useNewShow();
	const [{ dialogOpen, datetime, title, notes, error, save }, newShowDispatch] = useReducer(
		newShowReducer,
		initialNewShow
	);

	/**
	 * Clear any error messages when trying a new date.
	 */
	useEffect(() => {
		if (datetime && error) newShowDispatch({ type: 'CLEAR_ERRORS' });
	}, [datetime, error]);

	const handleNextShowClick = () => newShowDispatch({ type: 'OPEN' });

	const handleDateTimePickerChange = (value) => newShowDispatch({ type: 'ONCHANGE', name: 'datetime', value });

	const handleNextShowTitleChange = (event) =>
		newShowDispatch({ type: 'ONCHANGE', name: 'title', value: event.target.value });

	const handleNextShowNotesChange = (event) =>
		newShowDispatch({ type: 'ONCHANGE', name: 'notes', value: event.target.value });

	/**
	 * Fire the mutation to create a new Show.
	 */
	useEffect(() => {
		if (!save) return;

		newShowMutation(datetime, title, notes)
			.then(() => newShowDispatch({ type: 'CLEAR' }))
			.catch((errors) => newShowDispatch({ type: 'ERROR', error: errors.message }));

		// Clear the new show fields.
	});

	const handleSubmitNewShow = () => {
		newShowDispatch({ type: 'SAVE' });
	};

	const handleCancelNewShow = () => newShowDispatch({ type: 'CLEAR' });

	return (
		<>
			{dialogOpen === false ? (
				<Button variant="contained" onClick={handleNextShowClick}>
					Start Next Show
				</Button>
			) : (
				<Paper variant="elevation" sx={{ p: 2 }}>
					<Stack spacing={2}>
						<>
							<DateTimePicker
								label="Show Date and Time"
								value={datetime}
								disablePast={true}
								onChange={handleDateTimePickerChange}
								renderInput={(params) => <TextField {...params} required={true} />}
							/>
							{error ? (
								<Typography variant="caption" color="warning.main" sx={{ mt: 0, lineHeight: 1 }}>
									{error}
								</Typography>
							) : null}
							<TextField
								label="Next Show Title/ID"
								variant="outlined"
								value={title}
								onChange={handleNextShowTitleChange}
							/>
							<TextField
								label="Show Notes"
								multiline={true}
								minRows={3}
								variant="outlined"
								value={notes}
								onChange={handleNextShowNotesChange}
							/>
							<ButtonGroup disableElevation={false}>
								<Button
									size="large"
									onClick={handleSubmitNewShow}
									variant="contained"
									disabled={datetime ? false : true}
								>
									Confirm
								</Button>
								<Button size="large" onClick={handleCancelNewShow} variant="contained">
									Cancel
								</Button>
							</ButtonGroup>
						</>
					</Stack>
				</Paper>
			)}
		</>
	);
}
