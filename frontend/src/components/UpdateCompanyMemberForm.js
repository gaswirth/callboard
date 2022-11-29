import React, { useEffect, useReducer } from 'react';
import { FormControl, FormControlLabel, FormGroup, IconButton, Switch, Stack, TextField } from '@mui/material';
import { Check, Clear } from '@mui/icons-material';

import { CompanyMember } from 'lib/classes';
import { useNewCompanyMember } from 'hooks/mutations/use-new-company-member';
import { useUpdateCompanyMember } from 'hooks/mutations/use-update-company-member';

const emptyCM = new CompanyMember();
const initialCompanyMemberState = { ...emptyCM };

function updateCompanyMemberReducer(state, action) {
	switch (action.type) {
		case 'INIT':
			const newCM = new CompanyMember(
				action.id,
				action.firstName,
				action.lastName,
				action.email,
				action.role,
				action.active
			);

			return {
				...state,
				...newCM,
			};

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
	const [updateCompanyMember, updateCompanyMemberDispatch] = useReducer(
		updateCompanyMemberReducer,
		initialCompanyMemberState
	);

	useEffect(() => {
		if (!companyMember) return;

		const { id, firstName, lastName, email, role, active } = companyMember;
		updateCompanyMemberDispatch({
			type: 'INIT',
			id,
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

	return (
		<FormControl>
			<form onSubmit={handleSave}>
				<FormGroup>
					<TextField
						label="First name"
						value={updateCompanyMember.firstName}
						id="firstName"
						name="firstName"
						onChange={handleTextChange}
					/>
					<TextField
						label="Last name"
						value={updateCompanyMember.lastName}
						id="lastName"
						name="lastName"
						onChange={handleTextChange}
					/>
				</FormGroup>
				<TextField label="Role" value={updateCompanyMember.role} id="role" name="role" onChange={handleTextChange} />
				<TextField
					label="Email"
					value={updateCompanyMember.email}
					id="email"
					name="email"
					onChange={handleTextChange}
				/>
				<FormGroup>
					<FormControlLabel
						label="Active"
						control={
							<Switch
								checked={updateCompanyMember.active || false}
								onChange={handleActiveToggle}
								inputProps={{ 'aria-label': 'active' }}
							/>
						}
					/>
				</FormGroup>
				<Stack direction="row" justifyContent="center">
					<IconButton aria-label="save" type="submit">
						<Check />
					</IconButton>
					<IconButton aria-label="cancel" onClick={handleCancelRow}>
						<Clear />
					</IconButton>
				</Stack>
			</form>
		</FormControl>
	);
}
