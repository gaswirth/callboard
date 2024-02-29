import React from 'react';
import { Container } from '@chakra-ui/react';

import UpdateCompanyMemberForm from './UpdateCompanyMemberForm';

/**
 *
 * @param {CompanyMember} companyMember
 * @returns
 */
export default function NewCompanyMember({ onCloseDialog }) {
	return (
		<Container maxWidth="md" py={2}>
			<UpdateCompanyMemberForm onCloseDialog={onCloseDialog} />
		</Container>
	);
}
