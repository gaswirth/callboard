import React, { useState } from 'react';
import { Autocomplete, Button, FormControl, TextField } from '@mui/material';

import { useUpdateShowAttendance } from '@hooks/mutations/use-update-show-attendance';

export default function AddCompanyMemberSelect({ companyMembers, show }) {
	const { updateAttendanceMutation } = useUpdateShowAttendance();
	const [selectedCompanyMember, setSelectedCompanyMember] = useState(null);

	const { id: showId, datetime } = show;

	const handleSelectCompanyMember = (event, newValue) => {
		setSelectedCompanyMember(newValue);
	};

	const handleAddCompanyMember = () => {
		if (!selectedCompanyMember) {
			return;
		}

		updateAttendanceMutation({ showId, companyMemberId: selectedCompanyMember.id, status: '' });
		setSelectedCompanyMember(null);
	};

	if (!companyMembers) {
		return null;
	}

	const options = companyMembers.map((item) => ({
		label: `${item.firstName} ${item.lastName}`,
		id: item.id,
	}));

	return (
		<FormControl variant="standard" sx={{ width: '80%', pt: 2 }}>
			<Autocomplete
				id="company-member-select"
				options={options}
				renderInput={(params) => <TextField {...params} label="Add Company Member" />}
				onChange={handleSelectCompanyMember}
				isOptionEqualToValue={(option, value) => option.id === value.id}
				selectOnFocus
				clearOnBlur
				handleHomeEndKeys
			/>
			{selectedCompanyMember ? (
				<Button size="small" onClick={handleAddCompanyMember} variant="contained" disabled={!datetime} sx={{ mt: 1 }}>
					Confirm
				</Button>
			) : null}
		</FormControl>
	);
}
