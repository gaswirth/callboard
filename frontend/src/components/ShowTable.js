import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { Button, ButtonGroup, InputLabel, MenuItem, Select } from '@mui/material';
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
	FormControl,
} from '@mui/material';

import StatusIcon from './StatusIcon';
import ShowNotes from './ShowNotes';
import { showLabel } from 'lib/functions';

import { useRoster } from 'hooks/queries/use-roster';
import { useBenchedRoster } from 'hooks/queries/use-benched-roster';
import { useUpdateShowAttendance } from 'hooks/mutations/use-update-show-attendance';

export default function ShowTable({ show, allowStatusChanges, allowRosterEdit }) {
	const { id, attendance, datetime } = show;
	const { roster } = useRoster(Object.keys(attendance));
	const { roster: bench } = useBenchedRoster(roster ? roster.map((item) => item.id) : null);
	const { updateAttendanceMutation } = useUpdateShowAttendance();
	const [rows, setRows] = useState([]);
	const [addCompanyMember, setAddCompanyMember] = useState('');

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

	const handleSelectAddCompanyMember = (event) => {
		setAddCompanyMember(event.target.value);
	};

	const handleAddCompanyMember = () => {
		updateAttendanceMutation({ showId: id, companyMemberId: addCompanyMember, status: '' });
	};

	const handleCancelAddCompanyMember = () => {
		setAddCompanyMember('');
	};

	// TODO Functionality: Remove user from show

	function AddCompanyMember() {
		return (
			<FormControl fullWidth sx={{ mt: 2 }}>
				<InputLabel id="bench-roster-select-label">Add Company Member</InputLabel>
				<Select
					labelId="bench-roster-select-label"
					id="bench-roster-select"
					value={addCompanyMember}
					onChange={handleSelectAddCompanyMember}
				>
					{bench?.map((user) => (
						<MenuItem key={user.id} value={user.id}>{`${user.firstName} ${user.lastName}`}</MenuItem>
					))}
				</Select>
				{addCompanyMember ? (
					<ButtonGroup disableElevation={false}>
						<Button
							size="small"
							onClick={handleAddCompanyMember}
							variant="contained"
							disabled={datetime ? false : true}
						>
							Confirm
						</Button>
						<Button size="small" onClick={handleCancelAddCompanyMember} variant="contained">
							Cancel
						</Button>
					</ButtonGroup>
				) : (
					''
				)}
			</FormControl>
		);
	}

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
								<TableCell
									sx={{
										pt: 1.5,
										pr: 1,
										pb: 1,
										pl: 0,
										borderRightWidth: 1,
										borderRightColor: 'neutral.gray',
										borderRightStyle: 'solid',
										textAlign: 'right',
									}}
									scope="row"
								>
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
										buttonDisabled={allowStatusChanges}
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			{allowRosterEdit && bench && bench.length > 0 ? <AddCompanyMember /> : ''}
			<ShowNotes show={show} editable={allowStatusChanges} />
		</Card>
	) : (
		''
	);
}
