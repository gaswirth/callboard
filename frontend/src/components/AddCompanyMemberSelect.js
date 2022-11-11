import React, { useState } from 'react';
import { Button, ButtonGroup, InputLabel, MenuItem, Select } from '@mui/material';
import { FormControl } from '@mui/material';

import { useUpdateShowAttendance } from 'hooks/mutations/use-update-show-attendance';

export default function AddCompanyMemberSelect({ companyMembers, show }) {
	const [addCompanyMember, setAddCompanyMember] = useState('');
	const { updateAttendanceMutation } = useUpdateShowAttendance();

	const { id: showId, datetime } = show;

	const handleSelectAddCompanyMember = (event) => {
		setAddCompanyMember(event.target.value);
	};

	const handleAddCompanyMember = () => {
		updateAttendanceMutation({ showId, companyMemberId: addCompanyMember, status: '' });
		setAddCompanyMember('');
	};

	const handleCancelAddCompanyMember = () => {
		setAddCompanyMember('');
	};

	return companyMembers ? (
		<FormControl variant="standard" sx={{ width: '80%' }}>
			<InputLabel id="company-member-select-label" sx={{ textAlign: 'right' }}>
				Add Company Member
			</InputLabel>
			{/* TODO Autocomplete MUI component */}
			<Select
				labelId="company-member-select-label"
				id="company-member-select"
				value={addCompanyMember}
				onChange={handleSelectAddCompanyMember}
				sx={{ borderWidth: 0 }}
			>
				{companyMembers.map((user) => (
					<MenuItem key={user.id} value={user.id}>{`${user.firstName} ${user.lastName}`}</MenuItem>
				))}
			</Select>
			{addCompanyMember ? (
				<ButtonGroup disableElevation={false}>
					<Button size="small" onClick={handleAddCompanyMember} variant="contained" disabled={datetime ? false : true}>
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
	) : null;
}
