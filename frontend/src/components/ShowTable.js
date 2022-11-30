import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { visuallyHidden } from '@mui/utils';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Card,
	Typography,
	Container,
} from '@mui/material';

import { showLabel } from 'lib/functions';
import StatusIcon from './StatusIcon';
import ShowNotes from './ShowNotes';
import AddCompanyMemberSelect from './AddCompanyMemberSelect';

import { useRoster } from 'hooks/queries/use-roster';
import { useRosterExcluding } from 'hooks/queries/use-roster-excluding';
import CompanyMemberDialog from './CompanyMemberDialog';

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

	return show ? (
		<>
			<Card sx={{ width: '100%' }}>
				<TableContainer>
					<Table aria-label="show attendance table">
						<TableHead>
							<TableRow>
								<TableCell
									sx={{
										flexShrink: 1,
										flexGrow: 1,
										textAlign: 'right',
										borderRightWidth: 1,
										borderRightColor: 'neutral.gray',
										borderRightStyle: 'solid',
										textTransform: 'uppercase',
									}}
								>
									<Typography variant="button" sx={visuallyHidden}>
										Company Member
									</Typography>
								</TableCell>
								<TableCell id={showId}>
									<Typography
										variant="button"
										lineHeight={1.2}
										sx={{
											cursor: 'default',
											display: 'block',
											borderRadius: 1,
											fontSize: '1.1em',
										}}
									>
										{showLabel(datetime).date}
										<br />
										{showLabel(datetime).time}
									</Typography>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row, index) => {
								const { companyMemberId, fullName, role, attendance } = row;
								return (
									<TableRow key={index}>
										<TableCell sx={{ ...cellStyle }} scope="row">
											<Typography variant="body2" sx={{ lineHeight: 1 }}>
												{fullName}
											</Typography>
											<Typography variant="caption">{role}</Typography>
										</TableCell>
										<TableCell key={index} scope="row">
											<StatusIcon
												status={attendance ? attendance : ''}
												companyMemberId={companyMemberId}
												showId={showId}
												allowChange={allowStatusChanges}
											/>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
					{rosterExcluding && rosterExcluding.length && allowAddCompanyMember ? (
						<Container
							sx={{
								backgroundColor: 'neutral.lightergray',
								pt: 1,
								pb: 3,
								px: 3,
								textAlign: 'center',
							}}
						>
							<AddCompanyMemberSelect companyMembers={rosterExcluding} show={show} />
						</Container>
					) : null}
				</TableContainer>
				<ShowNotes show={show} editable={allowStatusChanges} />
			</Card>
			<CompanyMemberDialog companyMemberId={editCompanyMember} onCloseDialog={handleCloseCompanyMemberDialog} />
		</>
	) : (
		''
	);
}
