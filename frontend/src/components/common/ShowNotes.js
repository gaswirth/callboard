import React, { useState } from 'react';
import { Button, ButtonGroup, Paper, TextField, Typography } from '@mui/material';
import { useUpdateShowNotes } from 'hooks/mutations/use-update-show-notes';

export default function ShowNotes({ show, editable }) {
	const [notes, setNotes] = useState(show?.notes);
	const { updateShowNotesMutation } = useUpdateShowNotes();

	const handleShowNotesChange = (event) => {
		setNotes(event.target.value);
	};

	const handleSubmitNotes = () => {
		updateShowNotesMutation(show.databaseId, notes);
	};

	const handleCancelNotes = () => {
		setNotes(show?.notes);
	};

	return show ? (
		<Paper sx={{ p: 2, mt: 2 }}>
			<Typography variant="subtitle1" fontWeight="bold" textAlign="center" sx={{ mb: 1 }}>
				Show notes
			</Typography>
			{editable ? (
				<>
					<TextField
						label="Show Notes"
						multiline={true}
						minRows={3}
						variant="outlined"
						value={notes}
						onChange={handleShowNotesChange}
						sx={{ width: '100%', mb: 1 }}
					/>
					<ButtonGroup disableElevation={false}>
						<Button size="large" onClick={handleSubmitNotes} variant="contained">
							Save
						</Button>
						<Button size="large" onClick={handleCancelNotes} variant="contained">
							Cancel
						</Button>
					</ButtonGroup>
				</>
			) : (
				<Typography variant="body2" sx={{ p: 1 }}>
					{show.notes ? show.notes : 'No notes.'}
				</Typography>
			)}
		</Paper>
	) : null;
}
