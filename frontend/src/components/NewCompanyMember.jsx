import React from 'react';
import { Container } from '@mui/material';

import UpdateCompanyMemberForm from './UpdateCompanyMemberForm';

/**
 *
 * @param {CompanyMember} companyMember
 * @returns
 */
export default function NewCompanyMember({ onCloseDialog }) {
	return (
		<Container maxWidth="md" sx={{ py: 2 }}>
			<UpdateCompanyMemberForm onCloseDialog={onCloseDialog} />
		</Container>
	);
}
