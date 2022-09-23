import React, { useEffect, useState } from 'react';
import { Stack, Typography, ButtonGroup, Button, TextField, Paper } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import ViewHeading from 'components/ViewHeading';
import { useNewShow } from 'hooks/mutations/use-new-show';

export default function NextShowControl() {
	const { newShowMutation } = useNewShow();

	const [newShowDateTime, setNewShowDateTime] = useState(null);
	const [newShowTitle, setNewShowTitle] = useState('');
	const [newShowNotes, setNewShowNotes] = useState('');
	const [newShowError, setNewShowError] = useState('');

	/**
	 * Clear any error messages when trying a new date.
	 */
	useEffect(() => {
		if (newShowDateTime && newShowError) setNewShowError('');
	}, [newShowDateTime, newShowError]);

	const handleDateTimePickerChange = (value) => setNewShowDateTime(value);

	const handleNextShowTitleChange = (event) => setNewShowTitle(event.target.value);

	const handleNextShowNotesChange = (event) => setNewShowNotes(event.target.value);

	/**
	 * Fire the mutation to create a new Show.
	 */
	const handleSubmitNewShow = () => {
		newShowMutation(newShowDateTime, newShowTitle, newShowNotes).catch((errors) => setNewShowError(errors.message));

		// Clear the new show fields.
		setNewShowDateTime(null);
		setNewShowTitle('');
		setNewShowNotes('');
	};

	return (
		<>
			<ViewHeading variant="h6">Next Show</ViewHeading>
			<Paper variant="elevation" sx={{ p: 2 }}>
				<Stack spacing={2}>
					<>
						<DateTimePicker
							label="Show Date and Time"
							value={newShowDateTime}
							disablePast={true}
							onChange={handleDateTimePickerChange}
							renderInput={(params) => <TextField {...params} required={true} />}
						/>
						{newShowError ? (
							<Typography variant="caption" color="warning.main" sx={{ mt: 0, lineHeight: 1 }}>
								{newShowError}
							</Typography>
						) : null}
						<TextField
							label="Next Show Title/ID"
							variant="outlined"
							value={newShowTitle}
							onChange={handleNextShowTitleChange}
						/>
						<TextField
							label="Show Notes"
							multiline={true}
							minRows={3}
							variant="outlined"
							value={newShowNotes}
							onChange={handleNextShowNotesChange}
						/>
						<ButtonGroup disableElevation={false}>
							<Button
								size="large"
								onClick={handleSubmitNewShow}
								variant="contained"
								disabled={newShowDateTime ? false : true}
							>
								Confirm
							</Button>
						</ButtonGroup>
					</>
				</Stack>
			</Paper>
		</>
	);
}
