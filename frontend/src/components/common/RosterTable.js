import React, { useEffect, useReducer } from 'react';
import { Stack } from '@mui/system';
import { Check, Clear, ModeEdit } from '@mui/icons-material';
import {
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
	Container,
	Switch,
	FormGroup,
	FormControlLabel,
	Link,
} from '@mui/material';
import { isEmpty } from 'lodash';

import { CompanyMember } from 'lib/classes';
import { useUpdateCompanyMember } from 'hooks/mutations/use-update-company-member';

const initialEditRow = { companyMember: new CompanyMember(), save: false };

function editCompanyMemberReducer(state, action) {
	switch (action.type) {
		case 'EDIT_START':
			const person = new CompanyMember(
				action.id,
				action.firstName,
				action.lastName,
				action.email,
				action.role,
				action.active
			);

			return {
				...state,
				...person,
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

		case 'SAVE':
			return { ...state, save: true };

		case 'SAVE_COMPLETE':
			return { ...initialEditRow, save: false };

		case 'CANCEL':
		default:
			return initialEditRow;
	}
}

export default function RosterTable({ roster }) {
	const { updateCompanyMemberMutation } = useUpdateCompanyMember();
	const [editCompanyMember, editCompanyMemberDispatch] = useReducer(editCompanyMemberReducer, initialEditRow);

	const handleEditClick = (event) => {
		const { id } = event.currentTarget;
		const companyMember = roster.find((item) => item.id === id);
		const { firstName, lastName, email, role, active } = companyMember;

		editCompanyMemberDispatch({
			type: 'EDIT_START',
			id,
			firstName,
			lastName,
			email,
			role,
			active,
		});
	};

	/**
	 * Fire the mutation!
	 */
	useEffect(() => {
		if (!editCompanyMember.save) return;

		updateCompanyMemberMutation(editCompanyMember)
			.then(editCompanyMemberDispatch({ type: 'SAVE_COMPLETE' }))
			.catch((errors) => {
				console.log(errors);
			});
	}, [editCompanyMember, updateCompanyMemberMutation]);

	const handleTextChange = (event) => {
		editCompanyMemberDispatch({
			type: 'ONCHANGE',
			name: event.target.name,
			value: event.target.value,
		});
	};

	const handleActiveToggle = () => {
		editCompanyMemberDispatch({ type: 'TOGGLE_ACTIVE' });
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			handleSaveRow();
		}
	};

	const handleSaveRow = () => {
		editCompanyMemberDispatch({ type: 'SAVE' });
	};

	const handleCancelRow = () => {
		editCompanyMemberDispatch({ type: 'CANCEL' });
	};

	return isEmpty(roster) ? null : (
		<Container sx={{ my: 4 }}>
			<TableContainer>
				<Table aria-label="Company roster">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Role</TableCell>
							<TableCell>Email</TableCell>
							<TableCell></TableCell>
							<TableCell>Edit</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{roster?.map((row) => (
							<TableRow key={row.id}>
								<TableCell>
									{editCompanyMember.id === row.id ? (
										<>
											<TextField
												value={editCompanyMember.firstName}
												name="firstName"
												onChange={handleTextChange}
												onKeyPress={handleKeyPress}
											/>
											<TextField
												value={editCompanyMember.lastName}
												name="lastName"
												onChange={handleTextChange}
												onKeyPress={handleKeyPress}
											/>
										</>
									) : (
										<Typography variant="body">
											{row.firstName} {row.lastName}
										</Typography>
									)}
								</TableCell>
								<TableCell>
									{editCompanyMember.id === row.id ? (
										<TextField
											value={editCompanyMember.role}
											name="role"
											onChange={handleTextChange}
											onKeyPress={handleKeyPress}
										/>
									) : (
										<Typography variant="body">{row.role}</Typography>
									)}
								</TableCell>
								<TableCell>
									{editCompanyMember.id === row.id ? (
										<TextField
											value={editCompanyMember.email}
											name="email"
											onChange={handleTextChange}
											onKeyPress={handleKeyPress}
										/>
									) : (
										<Typography variant="body">
											<Link href={`mailto:${row.email}`} sx={{ textDecorationStyle: 'dotted' }}>
												{row.email}
											</Link>
										</Typography>
									)}
								</TableCell>
								<TableCell>
									{editCompanyMember.id === row.id ? (
										<FormGroup>
											<FormControlLabel
												label="Active"
												control={
													<Switch
														checked={editCompanyMember.active}
														onChange={handleActiveToggle}
														inputProps={{ 'aria-label': 'active' }}
													/>
												}
											/>
										</FormGroup>
									) : null}
								</TableCell>
								<TableCell>
									<Stack direction="row" justifyContent="center">
										{editCompanyMember.id === row.id ? (
											<>
												<IconButton aria-label="save" onClick={handleSaveRow}>
													<Check />
												</IconButton>
												<IconButton aria-label="cancel" onClick={handleCancelRow}>
													<Clear />
												</IconButton>
											</>
										) : (
											<IconButton aria-label="edit" onClick={handleEditClick} id={row.id}>
												<ModeEdit />
											</IconButton>
										)}
									</Stack>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
}
