import React, { useReducer } from 'react';
import { Stack, Typography, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { useNewShow } from '@/hooks/mutations/use-new-show';

const initialNewShow = {
	dialogOpen: false,
	datetime: '',
	title: '',
	notes: '',
	error: '',
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
				dialogOpen: true,
				error: action.message,
			};
		}

		case 'CLEAR_ERRORS': {
			return {
				...state,
				error: '',
			};
		}

		case 'CLEAR':
		default:
			return initialNewShow;
	}
}

export default function NewShow() {
	const { newShowMutation } = useNewShow();
	const [{ dialogOpen, datetime, title, notes, error }, newShowDispatch] = useReducer(newShowReducer, initialNewShow);

	const handleNextShowClick = () => newShowDispatch({ type: 'OPEN' });

	const handleDateTimePickerChange = (value) => newShowDispatch({ type: 'ONCHANGE', name: 'datetime', value });

	const handleNextShowTitleChange = (event) =>
		newShowDispatch({ type: 'ONCHANGE', name: 'title', value: event.target.value });

	const handleNextShowNotesChange = (event) =>
		newShowDispatch({ type: 'ONCHANGE', name: 'notes', value: event.target.value });

	const handleSubmitNewShow = () => {
		newShowMutation({ datetime, title, notes })
			.catch((error) => newShowDispatch({ type: 'ERROR', message: error.message }))
			.then((result) => {
				if (result) {
					// If data was returned, clear the modal.
					return newShowDispatch({ type: 'CLEAR' });
				}
			});
	};

	const handleCloseNewShowDialog = () => newShowDispatch({ type: 'CLEAR' });
	const handleCancelNewShow = () => newShowDispatch({ type: 'CLEAR' });

	return (
		<>
			{dialogOpen === false ? (
				<Button variant="contained" onClick={handleNextShowClick}>
					Start Next Show
				</Button>
			) : (
				<Dialog onClose={handleCloseNewShowDialog} open={dialogOpen}>
					<DialogTitle>New Show</DialogTitle>
					<DialogContent sx={{ px: 2, py: 1 }}>
						<Stack spacing={2}>
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
						</Stack>
					</DialogContent>
					<DialogActions sx={{ mb: 2, px: 2 }}>
						<Button size="large" onClick={handleSubmitNewShow} variant="contained" disabled={datetime ? false : true}>
							Confirm
						</Button>
						<Button size="large" onClick={handleCancelNewShow} variant="contained">
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
			)}
		</>
	);
}
