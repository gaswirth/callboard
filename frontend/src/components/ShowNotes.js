import React, { useState } from 'react';
import { Button, ButtonGroup, Card, TextField, Typography } from '@mui/material';
import { useUpdateShowNotes } from 'hooks/mutations/use-update-show-notes';

export default function ShowNotes({ show, editable, title }) {
	const [notes, setNotes] = useState(show?.notes);
	const [notesIsEditing, setNotesIsEditing] = useState(false);
	const { updateShowNotesMutation } = useUpdateShowNotes();

	const notesTitle = title ? title : 'Show notes';

	const handleEditNotes = () => {
		setNotesIsEditing(true);
	};

	const handleShowNotesChange = (event) => {
		setNotes(event.target.value);
	};

	const handleSubmitNotes = () => {
		updateShowNotesMutation(show.id, notes);
		setNotesIsEditing(false);
	};

	const handleCancelNotes = () => {
		setNotes(show?.notes);
		setNotesIsEditing(false);
	};

	return show ? (
		<Card sx={{ p: 2 }}>
			<Typography variant="subtitle1" fontWeight="bold" textAlign="center" sx={{ mb: 1 }}>
				{notesTitle}
			</Typography>
			{editable ? (
				<>
					<TextField
						multiline={true}
						minRows={3}
						variant="outlined"
						value={notes}
						placeholder={`Click "Edit" to add notes.`}
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
		</Card>
	) : null;
}
