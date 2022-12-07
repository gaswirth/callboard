import React from 'react';
import { Container, CircularProgress } from '@mui/material';

import { useRoster } from '@/hooks/queries/use-roster';
import UpdateCompanyMemberForm from './UpdateCompanyMemberForm';

/**
 *
 * @param {CompanyMember} companyMember
 * @returns
 */
export default function EditCompanyMember({ companyMemberId, onCloseDialog }) {
	const [{ loading }, roster] = useRoster({ ids: [companyMemberId] });
	const companyMember = roster?.find((i) => i.id === companyMemberId);

	return (
		<Container maxWidth="md" sx={{ py: 2 }}>
			{loading ? (
				<CircularProgress />
			) : (
				<UpdateCompanyMemberForm companyMember={companyMember} onCloseDialog={onCloseDialog} />
			)}
		</Container>
	);
}
