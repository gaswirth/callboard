import React, { useReducer } from 'react';
import {
	Stack,
	Text,
	Button,
	Input,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from '@chakra-ui/react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useNewShow } from '@hooks/mutations/use-new-show';

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
				<Button colorScheme="blue" onClick={handleNextShowClick}>
					Start Next Show
				</Button>
			) : (
				<Modal isOpen={dialogOpen} onClose={handleCloseNewShowDialog}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>New Show</ModalHeader>
						<ModalBody>
							<Stack spacing={2}>
								<DateTimePicker
									label="Show Date and Time"
									value={datetime}
									disablePast={true}
									onChange={handleDateTimePickerChange}
									renderInput={(params) => <Input {...params} isRequired={true} />}
								/>
								{error ? (
									<Text color="red.500" mt={0} lineHeight={1}>
										{error}
									</Text>
								) : null}
								<Input label="Next Show Title/ID" value={title} onChange={handleNextShowTitleChange} />
								<Input
									label="Show Notes"
									multiline={true}
									minRows={3}
									value={notes}
									onChange={handleNextShowNotesChange}
								/>
							</Stack>
						</ModalBody>
						<ModalFooter>
							<Button colorScheme="blue" onClick={handleSubmitNewShow} isDisabled={datetime ? false : true}>
								Confirm
							</Button>
							<Button colorScheme="gray" onClick={handleCancelNewShow}>
								Cancel
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			)}
		</>
	);
}
