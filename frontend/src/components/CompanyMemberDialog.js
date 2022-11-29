import React from 'react';
import { Dialog, Card } from '@mui/material';

import NewCompanyMember from './NewCompanyMember';
import EditCompanyMember from './EditCompanyMember';

export default function CompanyMemberDialog({ companyMemberId, newCompanyMember, onCloseDialog }) {
	const open = companyMemberId || newCompanyMember ? true : false;

	return (
		<Dialog
			open={!!open}
			onClose={onCloseDialog}
			aria-labelledby="companyMemberModal-title"
			aria-describedby="companyMemberModal-description"
		>
			<Card>
				{newCompanyMember ? (
					<NewCompanyMember onCloseDialog={onCloseDialog} />
				) : (
					<EditCompanyMember companyMemberId={companyMemberId} onCloseDialog={onCloseDialog} />
				)}
			</Card>
		</Dialog>
	);
}
