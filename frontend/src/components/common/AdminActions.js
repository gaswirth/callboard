import React, { useEffect, useState } from 'react';
import { Stack, Typography, ButtonGroup, Button, TextField } from '@mui/material';
import ViewHeading from 'components/common/ViewHeading';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { useNewShow } from 'hooks/mutations/use-new-show';

export default function AdminActions() {
	const { newShowMutation } = useNewShow();

	const [newShowDateTime, setNewShowDateTime] = useState(null);
	const [newShowTitle, setNewShowTitle] = useState('');
	const [newShowError, setNewShowError] = useState('');

	/**
	 * Clear any error messages when trying a new date.
	 */
	useEffect(() => {
		if (newShowDateTime && newShowError) setNewShowError('');
	}, [newShowDateTime, newShowError]);

	const handleDateTimePickerChange = (value) => setNewShowDateTime(value);

	const handleNextShowTitleChange = (event) => setNewShowTitle(event.target.value);

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
		<Stack spacing={2}>
			<ViewHeading variant="h6">Actions</ViewHeading>
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
		</Stack>
	);
}
