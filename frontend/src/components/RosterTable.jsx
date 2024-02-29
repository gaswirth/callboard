import React, { useState } from 'react';
import { Stack, IconButton, Table, Tbody, Td, Th, Thead, Tr, Text, Container, Link, Box } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { SlPencil } from 'react-icons/sl';
import CompanyMemberDialog from '@components/CompanyMemberDialog';

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
			<Container mt={2}>
				<Box overflowX="auto">
					<Table aria-label="Company roster">
						<Thead>
							<Tr>
								<Th>Name</Th>
								<Th>Role</Th>
								<Th>Email</Th>
								<Th></Th>
								<Th>Edit</Th>
							</Tr>
						</Thead>
						<Tbody>
							{roster?.map((row) => (
								<Tr key={row.id}>
									<Td>
										<Text>{row.fullName}</Text>
									</Td>
									<Td>
										<Text>{row.role}</Text>
									</Td>
									<Td>
										<Text>
											<Link href={`mailto:${row.email}`} textDecoration="underline">
												{row.email}
											</Link>
										</Text>
									</Td>
									<Td></Td>
									<Td>
										<Stack direction="row" justifyContent="center">
											<IconButton aria-label="edit" onClick={handleEditClick} id={row.id} icon={<SlPencil />} />
										</Stack>
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</Box>
			</Container>

			<CompanyMemberDialog companyMemberId={editCompanyMember} onCloseDialog={handleCloseCompanyMemberDialog} />
		</>
	);
}
