import { useState, useEffect } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr, Card, Text, Box } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { showLabel } from '@lib/functions';
import { useRoster } from '@hooks/queries/use-roster';
import { useRosterExcluding } from '@hooks/queries/use-roster-excluding';
import AddCompanyMemberSelect from '@components/AddCompanyMemberSelect';
import StatusIcon from '@components/StatusIcon';
import ShowNotes from '@components/ShowNotes';
import CompanyMemberDialog from '@components/CompanyMemberDialog';

export default function ShowTable({ show, allowStatusChanges, allowAddCompanyMember }) {
	const { id: showId, attendance, datetime } = show;
	const [, roster] = useRoster({ ids: Object.keys(attendance) });
	const [, rosterExcluding] = useRosterExcluding(roster ? roster.map((item) => item.id) : null);
	const [rows, setRows] = useState([]);
	const [editCompanyMember, setEditCompanyMember] = useState(null);

	/**
	 * Build the table rows.
	 */
	useEffect(() => {
		if (isEmpty(roster) || !show) return;

		var rows = [];

		for (let companyMember of roster) {
			const { fullName, role, id: companyMemberId } = companyMember;

			rows.push({
				companyMemberId,
				fullName,
				role,
				attendance: attendance[companyMemberId],
			});
		}

		setRows(rows);
	}, [roster, attendance, show]);

	// TODO Functionality: Remove user from show

	function handleCloseCompanyMemberDialog() {
		setEditCompanyMember(null);
	}

	const cellStyle = {
		pt: 1.5,
		pr: 1,
		pb: 1,
		pl: 0,
		borderRightWidth: 1,
		borderRightColor: 'neutral.gray',
		borderRightStyle: 'solid',
		textAlign: 'right',
	};

	return (
		<>
			<Card w="100%" boxShadow="sm" rounded="md">
				<Table aria-label="show attendance table">
					<Thead>
						<Tr>
							<Th {...cellStyle} borderBottomWidth={3}>
								<Text variant="body2" lineHeight={0.5} pt={0.5}>
									Name
								</Text>
								<Text fontSize="sm">Role</Text>
							</Th>
							<Th id={showId} borderBottomWidth={3}>
								<Text
									variant="button"
									lineHeight={1.2}
									cursor="default"
									display="block"
									borderRadius={1}
									fontSize="1.1em"
								>
									{showLabel(datetime).date}
									<br />
									{showLabel(datetime).time}
								</Text>
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{rows.map((row, index) => {
							const { companyMemberId, fullName, role, attendance } = row;
							return (
								<Tr key={index}>
									<Td {...cellStyle} scope="row">
										<Text variant="body2" lineHeight={1}>
											{fullName}
										</Text>
										<Text fontSize="sm">{role}</Text>
									</Td>
									<Td key={index} scope="row">
										<StatusIcon
											status={attendance ? attendance : ''}
											companyMemberId={companyMemberId}
											showId={showId}
											allowChange={allowStatusChanges}
										/>
									</Td>
								</Tr>
							);
						})}
					</Tbody>
				</Table>
				{rosterExcluding && rosterExcluding.length && allowAddCompanyMember ? (
					<Box bgColor="neutral.lightergray" pt={1} pb={3} px={3} textAlign="center">
						<AddCompanyMemberSelect companyMembers={rosterExcluding} show={show} />
					</Box>
				) : null}
				<ShowNotes show={show} editable={allowStatusChanges} />
			</Card>
			<CompanyMemberDialog companyMemberId={editCompanyMember} onCloseDialog={handleCloseCompanyMemberDialog} />
		</>
	);
}
