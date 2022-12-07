import React, { useState } from 'react';
import { Autocomplete, Button, FormControl, TextField } from '@mui/material';

import { useUpdateShowAttendance } from '@/hooks/mutations/use-update-show-attendance';

export default function AddCompanyMemberSelect({ companyMembers, show }) {
	const [addCompanyMember, setAddCompanyMember] = useState('');
	const { updateAttendanceMutation } = useUpdateShowAttendance();

	const { id: showId, datetime } = show;

	const handleSelectAddCompanyMember = (event, newValue) => {
		setAddCompanyMember(newValue?.id);
	};

	const handleAddCompanyMember = () => {
		updateAttendanceMutation({ showId, companyMemberId: addCompanyMember, status: '' });
		setAddCompanyMember('');
	};

	return companyMembers ? (
		<FormControl variant="standard" sx={{ width: '80%', pt: 2 }}>
			<Autocomplete
				id="company-member-select"
				options={companyMembers.map((item) => {
					return { label: `${item.firstName} ${item.lastName}`, id: item.id };
				})}
				renderInput={(params) => <TextField {...params} label="Add Company Member" />}
				onChange={handleSelectAddCompanyMember}
				isOptionEqualToValue={(option, value) => option.id === value.id}
				selectOnFocus
				clearOnBlur
				handleHomeEndKeys
			/>
			{addCompanyMember ? (
				<Button
					size="small"
					onClick={handleAddCompanyMember}
					variant="contained"
					disabled={datetime ? false : true}
					sx={{ mt: 1 }}
				>
					Confirm
				</Button>
			) : null}
		</FormControl>
	) : null;
}
