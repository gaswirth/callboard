import React, { useState } from 'react';
import { Button, FormControl, Select } from '@chakra-ui/react';

import { useUpdateShowAttendance } from '@hooks/mutations/use-update-show-attendance';

export default function AddCompanyMemberSelect({ companyMembers, show }) {
	const { updateAttendanceMutation } = useUpdateShowAttendance();
	const [selectedCompanyMember, setSelectedCompanyMember] = useState(null);

	const { id: showId, datetime } = show;

	const handleSelectCompanyMember = (event) => {
		const selectedOption = companyMembers.find((member) => member.id === event.target.value);
		setSelectedCompanyMember(selectedOption);
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

	return (
		<FormControl w="80%" pt={2}>
			<Select placeholder="Add Company Member" onChange={handleSelectCompanyMember}>
				{companyMembers.map((item) => (
					<option key={item.id} value={item.id}>
						{`${item.firstName} ${item.lastName}`}
					</option>
				))}
			</Select>
			{selectedCompanyMember ? (
				<Button size="sm" onClick={handleAddCompanyMember} colorScheme="teal" disabled={!datetime} mt={1}>
					Confirm
				</Button>
			) : null}
		</FormControl>
	);
}
