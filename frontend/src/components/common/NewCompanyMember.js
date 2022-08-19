import React, { useReducer, useEffect } from 'react';
import { FormControlLabel, FormGroup, IconButton, Paper, Switch, TextField, Typography } from '@mui/material';

import { CompanyMember } from 'lib/classes';
import { useNewCompanyMember } from 'hooks/mutations/use-new-company-member';
import { Stack } from '@mui/system';
import { Check, Clear } from '@mui/icons-material';

const emptyCompanyMember = new CompanyMember('', '', '', '', true);
const initialCompanyMember = { ...emptyCompanyMember, email: '' };

function newCompanyMemberReducer(state, action) {
	switch (action.type) {
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

		case 'SAVE':
			return { ...state, save: true };

		case 'SAVE_COMPLETE':
			return { ...initialCompanyMember, save: false };

		case 'CANCEL':
		default:
			return initialCompanyMember;
	}
}

export default function NewCompanyMember({ setIsOpen }) {
	const [newCompanyMember, newCompanyMemberDispatch] = useReducer(newCompanyMemberReducer, initialCompanyMember);
	const { newCompanyMemberMutation } = useNewCompanyMember();

	/**
	 * Fire the mutation!
	 */
	useEffect(() => {
		if (!newCompanyMember.save) return;

		newCompanyMemberMutation(newCompanyMember)
			.then(newCompanyMemberDispatch({ type: 'SAVE_COMPLETE' }))
			.then(setIsOpen(false))
			.catch((errors) => {
				console.log(errors);
			});
	}, [newCompanyMember, newCompanyMemberMutation, setIsOpen]);

	const handleTextChange = (event) => {
		newCompanyMemberDispatch({
			type: 'ONCHANGE',
			name: event.target.name,
			value: event.target.value,
		});
	};

	const handleActiveToggle = () => {
		newCompanyMemberDispatch({ type: 'TOGGLE_ACTIVE' });
	};

	const handleNewCompanyMemberSubmit = (event) => {
		event.preventDefault();
		newCompanyMemberDispatch({ type: 'SAVE' });
	};

	const handleNewCompanyMemberCancel = () => {
		newCompanyMemberDispatch({ type: 'CANCEL' });
		setIsOpen(false);
	};

	return (
		<Paper elevation={4} sx={{ py: 2, px: 4, mt: 2, mb: 4 }}>
			<form onSubmit={handleNewCompanyMemberSubmit}>
				<Typography variant="button">New Company Member</Typography>
				<Stack direction="row" justifyContent="space-between" alignItems="center">
					<Stack direction="row">
						<TextField
							value={newCompanyMember.firstName}
							name="firstName"
							label="First Name"
							onChange={handleTextChange}
							required={true}
						/>
						<TextField
							value={newCompanyMember.lastName}
							name="lastName"
							label="Last Name"
							onChange={handleTextChange}
						/>
					</Stack>

					<TextField
						value={newCompanyMember.email}
						required={true}
						name="email"
						label="Email"
						onChange={handleTextChange}
					/>

					<TextField
						value={newCompanyMember.role}
						required={true}
						name="role"
						label="Role"
						onChange={handleTextChange}
					/>

					<FormGroup>
						<FormControlLabel
							label="Active"
							control={
								<Switch
									checked={newCompanyMember.active}
									onChange={handleActiveToggle}
									inputProps={{ 'aria-label': 'active' }}
								/>
							}
						/>
					</FormGroup>
					<Stack direction="row">
						<IconButton type="submit" aria-label="Submit">
							<Check />
						</IconButton>
						<IconButton aria-label="Cancel" onClick={handleNewCompanyMemberCancel}>
							<Clear />
						</IconButton>
					</Stack>
				</Stack>
			</form>
		</Paper>
	);
}
