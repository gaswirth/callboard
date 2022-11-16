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

import StatusIcon from './StatusIcon';
import ShowNotes from './ShowNotes';
import AddCompanyMemberSelect from './AddCompanyMemberSelect';
import { showLabel } from 'lib/functions';

import { useRoster } from 'hooks/queries/use-roster';
import { useRosterExcluding } from 'hooks/queries/use-roster-excluding';

export default function ShowTable({ show, allowStatusChanges, allowRosterEdit }) {
	const { id, attendance, datetime } = show;
	const { roster } = useRoster({ ids: Object.keys(attendance) });
	const { roster: bench } = useRosterExcluding(roster ? roster.map((item) => item.id) : null);
	const [rows, setRows] = useState([]);

	/**
	 * Build the table rows.
	 */
	useEffect(() => {
		if (isEmpty(roster) || !show) return;

		var rows = [];

		for (let companyMember of roster) {
			const { firstName, lastName, role, id } = companyMember;

			rows.push({
				companyMemberId: id,
				firstName,
				lastName,
				role,
				attendance: attendance[id],
			});
		}

		setRows(rows);
	}, [roster, attendance, show]);

	// TODO Functionality: Remove user from show

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
							<TableCell id={id}>
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
						{rows.map((row, index) => (
							<TableRow key={index}>
								<TableCell sx={{ ...cellStyle }} scope="row">
									<Typography variant="body2" sx={{ lineHeight: 1 }}>
										{`${row.firstName} ${row.lastName}`}
									</Typography>
									<Typography variant="caption">{row.role}</Typography>
								</TableCell>

								<TableCell key={index} scope="row">
									<StatusIcon
										status={row.attendance ? row.attendance : ''}
										companyMemberId={row.companyMemberId}
										showId={id}
										allowChange={allowStatusChanges}
									/>
								</TableCell>
							</TableRow>
						))}
						{/* {allowRosterEdit && bench && bench.length > 0 ? (
							<TableRow key="add-company-member">
								<TableCell sx={{ ...cellStyle, py: 2 }} scope="row">
									<AddCompanyMemberSelect companyMembers={bench} show={show} />
								</TableCell>
								<TableCell></TableCell>
							</TableRow>
						) : (
							''
						)} */}
					</TableBody>
				</Table>
				<Container sx={{ py: 1, px: 2 }}>
					<AddCompanyMemberSelect companyMembers={bench} show={show} />
				</Container>
			</TableContainer>
			<ShowNotes show={show} editable={allowStatusChanges} />
		</Card>
	) : (
		''
	);
}
