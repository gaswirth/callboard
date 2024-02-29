import React from 'react';
import { Container, CircularProgress } from '@chakra-ui/react';
import { useRoster } from '@hooks/queries/use-roster';
import UpdateCompanyMemberForm from '@components/UpdateCompanyMemberForm';

/**
 *
 * @param {CompanyMember} companyMember
 * @returns
 */
export default function EditCompanyMember({ companyMemberId, onCloseDialog }) {
	const [{ loading }, roster] = useRoster({ ids: [companyMemberId] });
	const companyMember = roster?.find((i) => i.id === companyMemberId);

	return (
		<Container maxW="container.md" py={2}>
			{loading ? (
				<CircularProgress isIndeterminate />
			) : (
				<UpdateCompanyMemberForm companyMember={companyMember} onCloseDialog={onCloseDialog} />
			)}
		</Container>
	);
}
