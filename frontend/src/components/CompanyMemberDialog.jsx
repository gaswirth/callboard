import React from 'react';
import { Modal, ModalOverlay, ModalContent, Box } from '@chakra-ui/react';

import NewCompanyMember from './NewCompanyMember';
import EditCompanyMember from './EditCompanyMember';

export default function CompanyMemberDialog({ companyMemberId, newCompanyMember, onCloseDialog }) {
	const isOpen = companyMemberId || newCompanyMember ? true : false;

	return (
		<Modal
			isOpen={isOpen}
			onClose={onCloseDialog}
			aria-labelledby="companyMemberModal-title"
			aria-describedby="companyMemberModal-description"
		>
			<ModalOverlay />
			<ModalContent>
				<Box p={4}>
					{newCompanyMember ? (
						<NewCompanyMember onCloseDialog={onCloseDialog} />
					) : (
						<EditCompanyMember companyMemberId={companyMemberId} onCloseDialog={onCloseDialog} />
					)}
				</Box>
			</ModalContent>
		</Modal>
	);
}
