// TODO make form work w/ chakra

import { useEffect, useReducer } from 'react';
import { FormControl, Button, Stack, Input, Checkbox, Box, useColorModeValue } from '@chakra-ui/react';

import { createCompanyMember } from '@lib/functions';

import { useNewCompanyMember } from '@hooks/mutations/use-new-company-member';
import { useUpdateCompanyMember } from '@hooks/mutations/use-update-company-member';
import { useSendPasswordResetEmail } from '@hooks/mutations/use-reset-password-email';

const emptyCM = createCompanyMember();
const initialCompanyMemberState = { ...emptyCM };

function updateCompanyMemberReducer(state, action) {
	switch (action.type) {
		case 'INIT': {
			const { id, username, firstName, lastName, email, role, active } = action;
			const newCM = createCompanyMember({
				id,
				username,
				firstName,
				lastName,
				email,
				role,
				active,
			});

			return {
				...state,
				...newCM,
			};
		}

		case 'ONCHANGE':
			return {
				...state,
				[action.name]: action.value,
			};

		case 'TOGGLE_ACTIVE':
			return {
				...state,
				active: !state.active,
			};

		case 'CLEAR':
		default:
			return initialCompanyMemberState;
	}
}

export default function UpdateCompanyMemberForm({ companyMember, onCloseDialog }) {
	const { updateCompanyMemberMutation } = useUpdateCompanyMember();
	const { newCompanyMemberMutation } = useNewCompanyMember();
	const { sendResetPasswordEmailMutation } = useSendPasswordResetEmail();
	const [updateCompanyMember, updateCompanyMemberDispatch] = useReducer(
		updateCompanyMemberReducer,
		initialCompanyMemberState
	);

	useEffect(() => {
		if (!companyMember) return;

		const { id, username, firstName, lastName, email, role, active } = companyMember;
		updateCompanyMemberDispatch({
			type: 'INIT',
			id,
			username,
			firstName,
			lastName,
			email,
			role,
			active,
		});
	}, [companyMember]);

	const handleTextChange = (event) => {
		updateCompanyMemberDispatch({
			type: 'ONCHANGE',
			name: event.target.name,
			value: event.target.value,
		});
	};

	const handleActiveToggle = () => {
		updateCompanyMemberDispatch({ type: 'TOGGLE_ACTIVE' });
	};

	const handleSave = () => {
		if (updateCompanyMember.id) {
			updateCompanyMemberMutation(updateCompanyMember)
				.then(updateCompanyMemberDispatch({ type: 'CLEAR' }))
				.catch((errors) => {
					console.log(errors);
				});
		} else {
			newCompanyMemberMutation(updateCompanyMember)
				.then(updateCompanyMemberDispatch({ type: 'CLEAR' }))
				.catch((errors) => {
					console.log(errors);
				});
		}

		onCloseDialog();
	};

	const handleCancelRow = () => {
		updateCompanyMemberDispatch({ type: 'CLEAR' });
		onCloseDialog();
	};

	const handleResetPasswordClick = () => {
		sendResetPasswordEmailMutation({ username: updateCompanyMember.username });
	};

	const warningColor = useColorModeValue('red.500', 'red.300');

	return (
		<FormControl p={2}>
			<form onSubmit={handleSave}>
				<Stack direction={{ base: 'column', md: 'row' }}>
					<Input
						label="First name"
						value={updateCompanyMember.firstName}
						id="firstName"
						name="firstName"
						onChange={handleTextChange}
						mb={1}
					/>
					<Input
						label="Last name"
						value={updateCompanyMember.lastName}
						id="lastName"
						name="lastName"
						onChange={handleTextChange}
						mb={1}
					/>
				</Stack>
				<Stack direction="column">
					<Input
						label="Role"
						value={updateCompanyMember.role}
						id="role"
						name="role"
						onChange={handleTextChange}
						mb={1}
					/>
					<Input
						label="Email"
						value={updateCompanyMember.email}
						id="email"
						name="email"
						onChange={handleTextChange}
						mb={1}
					/>
				</Stack>
				<Box mt={2}>
					<Checkbox
						checked={updateCompanyMember.active || false}
						size="md"
						onChange={handleActiveToggle}
						aria-label="active"
					>
						Active roster
					</Checkbox>
				</Box>
				<Stack direction="row" justifyContent="space-between" mt={4}>
					<Stack direction="row" justifyContent="center">
						<Button aria-label="save" type="submit" colorScheme="teal" mr={1}>
							Save
						</Button>
						<Button aria-label="cancel" onClick={handleCancelRow} colorScheme="teal">
							Cancel
						</Button>
					</Stack>
					<Button onClick={handleResetPasswordClick} colorScheme="red" backgroundColor={warningColor}>
						Send Password Reset
					</Button>
				</Stack>
			</form>
		</FormControl>
	);
}
