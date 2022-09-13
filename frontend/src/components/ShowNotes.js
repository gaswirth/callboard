import React, { useState } from 'react';
import { Button, ButtonGroup, Paper, TextField, Typography } from '@mui/material';
import { useUpdateShowNotes } from 'hooks/mutations/use-update-show-notes';

export default function ShowNotes({ show, editable }) {
	const [notes, setNotes] = useState(show?.notes);
	const [notesIsEditing, setNotesIsEditing] = useState(false);
	const { updateShowNotesMutation } = useUpdateShowNotes();

	const handleEditNotes = () => {
		setNotesIsEditing(true);
	};

	const handleShowNotesChange = (event) => {
		setNotes(event.target.value);
	};

	const handleSubmitNotes = () => {
		updateShowNotesMutation(show.databaseId, notes);
		setNotesIsEditing(false);
	};

	const handleCancelNotes = () => {
		setNotes(show?.notes);
		setNotesIsEditing(false);
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
						disabled={!notesIsEditing}
						sx={{ width: '100%', mb: 1 }}
					/>
					<ButtonGroup disableElevation={false}>
						{notesIsEditing ? (
							<>
								<Button onClick={handleSubmitNotes} variant="contained">
									Save
								</Button>
								<Button onClick={handleCancelNotes} variant="contained">
									Cancel
								</Button>
							</>
						) : (
							<Button onClick={handleEditNotes} variant="contained">
								Edit Notes
							</Button>
						)}
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
