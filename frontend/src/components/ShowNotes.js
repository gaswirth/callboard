import React, { useState } from 'react';
import { Button, Card, Container, TextField, Typography } from '@mui/material';

import { useUpdateShowNotes } from 'hooks/mutations/use-update-show-notes';
import { useDeleteShow } from 'hooks/mutations/use-delete-show';

export default function ShowNotes({ show, editable, title }) {
	const [notes, setNotes] = useState(show?.notes);
	const [armNotesEdit, setArmNotesEdit] = useState(false);
	const [armDeleteShow, setArmDeleteShow] = useState(false);
	const { updateShowNotesMutation } = useUpdateShowNotes();
	const { deleteShowMutation } = useDeleteShow();

	const notesTitle = title ? title : 'Show notes';

	const handleEditNotes = () => {
		setArmNotesEdit(true);
	};

	const handleShowNotesChange = (event) => {
		setNotes(event.target.value);
	};

	const handleDeleteShow = () => {
		setArmDeleteShow(true);
	};

	const reallyHandleDeleteShow = () => {
		deleteShowMutation(show.id).then((result) => {
			setArmDeleteShow(false);
		});
	};

	const handleSubmitNotes = () => {
		updateShowNotesMutation(show.id, notes);
		setArmNotesEdit(false);
	};

	const handleCancelNotes = () => {
		setNotes(show?.notes);
		setArmNotesEdit(false);
	};

	return show ? (
		<Card sx={{ p: 2 }}>
			<Typography variant="subtitle1" fontWeight="bold" textAlign="center" sx={{ mb: 1 }}>
				{notesTitle}
			</Typography>
			{editable ? (
				<>
					{/* Remove the Arming Edit button. Just click to edit. */}
					<TextField
						multiline={true}
						minRows={3}
						variant="outlined"
						value={notes}
						placeholder={`Click "Edit" to add notes.`}
						onChange={handleShowNotesChange}
						disabled={!armNotesEdit}
						sx={{ width: '100%', mb: 1 }}
					/>
					{armNotesEdit ? (
						<>
							<Button onClick={handleSubmitNotes} variant="contained">
								Save
							</Button>
							<Button onClick={handleCancelNotes} variant="contained">
								Cancel
							</Button>
						</>
					) : (
						<Container
							disableGutters={true}
							sx={{ display: 'inline-flex', justifyContent: 'space-between', my: 1, px: 0 }}
						>
							<Button onClick={handleEditNotes} variant="contained">
								Edit Notes
							</Button>
							{armDeleteShow ? (
								<Button onClick={reallyHandleDeleteShow} variant="contained" sx={{ backgroundColor: 'warning.strong' }}>
									CLICK AGAIN TO DELETE
								</Button>
							) : (
								<Button onClick={handleDeleteShow} variant="contained" sx={{ backgroundColor: 'warning.main' }}>
									Delete Show
								</Button>
							)}
						</Container>
					)}
				</>
			) : (
				<Typography variant="body2" sx={{ p: 1 }}>
					{show.notes ? show.notes : 'No notes.'}
				</Typography>
			)}
		</Card>
	) : null;
}
