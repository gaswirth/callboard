import React, { useReducer, useEffect, useState } from 'react';
import {
	Stack,
	FormControlLabel,
	FormGroup,
	Paper,
	Switch,
	TextField,
	Typography,
	ButtonGroup,
	Button,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { CompanyMember } from 'lib/classes';
import { useNewCompanyMember } from 'hooks/mutations/use-new-company-member';
import { Check, Clear } from '@mui/icons-material';

// TODO Change this to be a reusable AddCompanyMember module, and use this making a new company member, and editing.

const emptyCompanyMember = new CompanyMember('', '', '', '', '', true);
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

export default function AddCompanyMember({ setIsOpen }) {
	const [newCompanyMember, newCompanyMemberDispatch] = useReducer(newCompanyMemberReducer, initialCompanyMember);
	const { newCompanyMemberMutation } = useNewCompanyMember();
	const [loading, setLoading] = useState(false);

	/**
	 * Fire the mutation!
	 */
	useEffect(() => {
		if (!newCompanyMember.save) return;

		newCompanyMemberMutation(newCompanyMember)
			.then(setLoading(true))
			.then(newCompanyMemberDispatch({ type: 'SAVE_COMPLETE' }))
			.then(() => {
				setLoading(false);
				setIsOpen(false);
			})
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
						<ButtonGroup>
							<LoadingButton loading={loading ? true : false} variant="outlined" type="submit" aria-label="Submit">
								<Check />
							</LoadingButton>
							<Button aria-label="Cancel" onClick={handleNewCompanyMemberCancel}>
								<Clear />
							</Button>
						</ButtonGroup>
					</Stack>
				</Stack>
			</form>
		</Paper>
	);
}
