import { useState, useReducer, useEffect } from 'react';
import { Box, Button, Card, Text, Textarea, useColorModeValue } from '@chakra-ui/react';

import { useUpdateShowNotes } from '@hooks/mutations/use-update-show-notes';
import { useDeleteShow } from '@hooks/mutations/use-delete-show';

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
	const [notes, notesDispatch] = useReducer(notesReducer, initialNotes);
	const [armNotesEdit, setArmNotesEdit] = useState(false);
	const [armDeleteShow, setArmDeleteShow] = useState(false);
	const { updateShowNotesMutation } = useUpdateShowNotes();
	const { deleteShowMutation } = useDeleteShow();
	const grayColor = useColorModeValue('gray.400', 'gray.600');
	const warningColor = useColorModeValue('red.500', 'red.300');

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

	return (
		<Card p={2}>
			<Text fontWeight="bold" textAlign="center" mb={1}>
				Notes
			</Text>
			{editable ? (
				<>
					<Textarea
						minH="60px"
						value={notes.value}
						placeholder={`Click "Edit" to add notes.`}
						onChange={handleShowNotesChange}
						isDisabled={!armNotesEdit}
						mb={1}
						w="100%"
					/>
					<Box d="flex" justifyContent="space-between" my={1} px={0}>
						{armNotesEdit ? (
							<>
								<Button onClick={handleSubmitNotes} colorScheme="blue" mr={1}>
									Save
								</Button>
								<Button onClick={handleCancelNotes} colorScheme={grayColor}>
									Cancel
								</Button>
							</>
						) : (
							<>
								<Button onClick={handleEditNotes} colorScheme="blue">
									Edit Notes
								</Button>
								{armDeleteShow ? (
									<Button onClick={reallyHandleDeleteShow} colorScheme={warningColor}>
										CLICK AGAIN TO DELETE
									</Button>
								) : (
									<Button onClick={handleDeleteShow} colorScheme={grayColor}>
										Delete Show
									</Button>
								)}
							</>
						)}
					</Box>
				</>
			) : (
				<Text p={1}>{show.notes ? show.notes : 'No notes.'}</Text>
			)}
		</Card>
	);
}
