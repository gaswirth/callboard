import React, { useEffect, useReducer } from 'react';
import { FormControl, FormControlLabel, FormGroup, Button, Stack, TextField, Checkbox } from '@mui/material';

import { createCompanyMember } from '@/lib/functions';

import { useNewCompanyMember } from '@/hooks/mutations/use-new-company-member';
import { useUpdateCompanyMember } from '@/hooks/mutations/use-update-company-member';
import { useSendPasswordResetEmail } from '@/hooks/mutations/use-reset-password-email';

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

	const textFieldSx = {
		my: 1,
	};

	return (
		<FormControl sx={{ p: 2 }}>
			<form onSubmit={handleSave}>
				<Stack direction="row">
					<TextField
						label="First name"
						value={updateCompanyMember.firstName}
						id="firstName"
						name="firstName"
						onChange={handleTextChange}
						variant="standard"
						sx={textFieldSx}
					/>
					<TextField
						label="Last name"
						value={updateCompanyMember.lastName}
						id="lastName"
						name="lastName"
						variant="standard"
						onChange={handleTextChange}
						sx={textFieldSx}
					/>
				</Stack>
				<Stack direction="column">
					<TextField
						label="Role"
						value={updateCompanyMember.role}
						id="role"
						name="role"
						variant="standard"
						onChange={handleTextChange}
						sx={textFieldSx}
					/>
					<TextField
						label="Email"
						value={updateCompanyMember.email}
						id="email"
						name="email"
						variant="standard"
						onChange={handleTextChange}
						sx={textFieldSx}
					/>
				</Stack>
				<FormGroup sx={{ mt: 2 }}>
					{/* New company members are inactive by default. */}
					<FormControlLabel
						label="Active roster"
						control={
							<Checkbox
								checked={updateCompanyMember.active || false}
								size="medium"
								onChange={handleActiveToggle}
								inputProps={{ 'aria-label': 'active' }}
							/>
						}
					/>
				</FormGroup>
				<Stack direction="row" justifyContent="space-between" sx={{ mt: 4 }}>
					<Stack direction="row" justifyContent="center">
						<Button aria-label="save" type="submit" variant="contained" sx={{ mr: 1 }}>
							Save
						</Button>
						<Button aria-label="cancel" onClick={handleCancelRow} variant="contained">
							Cancel
						</Button>
					</Stack>
					<Button onClick={handleResetPasswordClick} variant="contained" sx={{ backgroundColor: 'warning.main' }}>
						Send Password Reset
					</Button>
				</Stack>
			</form>
		</FormControl>
	);
}
