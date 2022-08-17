import React from 'react';

import { useRoster } from 'hooks/queries/use-roster';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Stack } from '@mui/system';
import { ModeEdit, PersonOff } from '@mui/icons-material';

export default function Roster() {
	const { preparedData } = useRoster();

	const handleRowClick = (e) => {
		// TODO Enable row editing for admins.
	};

	return preparedData ? (
		<TableContainer>
			<Table aria-label="Company roster">
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Role</TableCell>
						<TableCell>Show Count</TableCell>
						<TableCell>Actions (not yet built)</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{preparedData.map((row, index) => (
						<TableRow key={index} onClick={handleRowClick}>
							<TableCell>{row.name}</TableCell>
							<TableCell>{row.role}</TableCell>
							<TableCell>#</TableCell>
							<TableCell>
								<Stack direction="row" spacing={1} justifyContent="center">
									<IconButton aria-label="edit">
										<ModeEdit />
									</IconButton>
									<IconButton aria-label="deactivate">
										<PersonOff />
									</IconButton>
								</Stack>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	) : (
		'No Company Members'
	);
}
