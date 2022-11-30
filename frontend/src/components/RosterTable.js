import React, { useState } from 'react';
import {
	Stack,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	Container,
	Link,
} from '@mui/material';
import { ModeEdit } from '@mui/icons-material';
import { isEmpty } from 'lodash';

import CompanyMemberDialog from './CompanyMemberDialog';

export default function RosterTable({ roster }) {
	const [editCompanyMember, setEditCompanyMember] = useState(null);

	const handleEditClick = (event) => {
		setEditCompanyMember(event.currentTarget.id);
	};

	const handleCloseCompanyMemberDialog = () => {
		setEditCompanyMember(null);
	};

	return isEmpty(roster) ? null : (
		<>
			<Container sx={{ mt: 2 }}>
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
										<Typography variant="body">{row.fullName}</Typography>
									</TableCell>
									<TableCell>
										<Typography variant="body">{row.role}</Typography>
									</TableCell>
									<TableCell>
										<Typography variant="body">
											<Link href={`mailto:${row.email}`} sx={{ textDecorationStyle: 'dotted' }}>
												{row.email}
											</Link>
										</Typography>
									</TableCell>
									<TableCell></TableCell>
									<TableCell>
										<Stack direction="row" justifyContent="center">
											<IconButton aria-label="edit" onClick={handleEditClick} id={row.id}>
												<ModeEdit />
											</IconButton>
										</Stack>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>

			<CompanyMemberDialog companyMemberId={editCompanyMember} onCloseDialog={handleCloseCompanyMemberDialog} />
		</>
	);
}
