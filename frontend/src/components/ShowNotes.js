import React, { useState, useReducer, useEffect } from 'react';
import { Button, Card, Container, TextField, Typography } from '@mui/material';

import { useUpdateShowNotes } from 'hooks/mutations/use-update-show-notes';
import { useDeleteShow } from 'hooks/mutations/use-delete-show';

const initialNotes = {
	value: '',
};

function notesReducer(state, action) {
	switch (action.type) {
		case 'SET_NOTES': {
			return { ...state, value: action.value };
		}

		default:
			return { initialNotes };
	}
}

export default function ShowNotes({ show, editable }) {
	// const [notes, setNotes] = useState('');
	const [notes, notesDispatch] = useReducer(notesReducer, initialNotes);
	const [armNotesEdit, setArmNotesEdit] = useState(false);
	const [armDeleteShow, setArmDeleteShow] = useState(false);
	const { updateShowNotesMutation } = useUpdateShowNotes();
	const { deleteShowMutation } = useDeleteShow();

	/**
	 * Set the notes value from props when `show.notes` changes.
	 */
	useEffect(() => {
		notesDispatch({ type: 'SET_NOTES', value: show.notes });
	}, [show.notes]);

	const handleEditNotes = () => {
		setArmNotesEdit(true);
	};

	const handleShowNotesChange = (event) => {
		notesDispatch({ type: 'SET_NOTES', value: event.target.value });
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
		updateShowNotesMutation(show.id, notes.value);
		setArmNotesEdit(false);
	};

	const handleCancelNotes = () => {
		notesDispatch({ type: 'SET_NOTES', value: show.notes });
		setArmNotesEdit(false);
	};

	return show ? (
		<Card sx={{ p: 2 }}>
			<Typography variant="subtitle1" fontWeight="bold" textAlign="center" sx={{ mb: 1 }}>
				Notes
			</Typography>
			{editable ? (
				<>
					{/* Remove the Arming Edit button. Just click to edit. */}
					<TextField
						multiline={true}
						minRows={3}
						variant="outlined"
						value={notes.value}
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
