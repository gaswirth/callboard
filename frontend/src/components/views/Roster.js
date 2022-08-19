import React, { useContext, useEffect, useReducer } from 'react';
import { Stack } from '@mui/system';
import { Check, Clear, ModeEdit, PersonOff } from '@mui/icons-material';

import { useRoster } from 'hooks/queries/use-roster';
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
} from '@mui/material';

import { CompanyMember } from 'lib/classes';

import { AuthContext } from 'context/AuthContext';
import { useUpdateCompanyMember } from 'hooks/mutations/use-update-company-member';

const initialEditRow = { companyMember: new CompanyMember(), save: false };

// TODO New company member
// TODO Implement active/inactive
// TODO Separate tables into active/inactive

function editCompanyMemberReducer(state, action) {
	switch (action.type) {
		case 'EDIT_START':
			const person = new CompanyMember(action.id, action.firstName, action.lastName, action.role);

			return {
				...state,
				...person,
			};

		case 'ONCHANGE':
			return {
				...state,
				[action.name]: action.value,
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

export default function Roster() {
	const {
		user: { isAdmin },
	} = useContext(AuthContext);
	const { preparedData } = useRoster();
	const { updateCompanyMemberMutation } = useUpdateCompanyMember();
	const [editCompanyMember, editCompanyMemberDispatch] = useReducer(editCompanyMemberReducer, initialEditRow);

	const handleEditClick = (event) => {
		// Only allow editing for admins.
		if (!isAdmin) return;

		const { id } = event.currentTarget;
		const companyMember = preparedData.find((person) => person.id === id);
		const { firstName, lastName, role } = companyMember;

		editCompanyMemberDispatch({
			type: 'EDIT_START',
			id,
			firstName,
			lastName,
			role,
		});
	};

	/**
	 * Fire the mutation!
	 */
	useEffect(() => {
		if (!editCompanyMember.save) return;

		const { id, firstName, lastName, role } = editCompanyMember;

		updateCompanyMemberMutation({ id, firstName, lastName, role })
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

	return preparedData ? (
		<TableContainer>
			<Table aria-label="Company roster">
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Role</TableCell>
						<TableCell>Show Count</TableCell>
						{isAdmin ? <TableCell>Actions</TableCell> : null}
					</TableRow>
				</TableHead>
				<TableBody>
					{preparedData.map((row) => (
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
							<TableCell>#</TableCell>
							{isAdmin ? (
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
											<>
												<IconButton aria-label="edit" onClick={handleEditClick} id={row.id}>
													<ModeEdit />
												</IconButton>
												<IconButton aria-label="deactivate">
													{/* TODO 'disabled' company member functionality */}
													<PersonOff />
												</IconButton>
											</>
										)}
									</Stack>
								</TableCell>
							) : null}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	) : (
		'No Company Members'
	);
}
