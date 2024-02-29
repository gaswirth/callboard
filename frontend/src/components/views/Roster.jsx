import { useContext, useState, useMemo } from 'react';
import { Heading, Box, Button, Container, Text } from '@chakra-ui/react';
import { SlPlus } from 'react-icons/sl';
import { isEmpty } from 'lodash';
import { useRoster } from '@hooks/queries/use-roster';
import RosterTable from '@components/RosterTable';
import CompanyMemberDialog from '@components/CompanyMemberDialog';
import { AuthContext } from '@context/AuthContext';

export default function Roster() {
	const {
		user: { isAdmin },
	} = useContext(AuthContext);
	const [addNewCompanyMember, setAddNewCompanyMember] = useState(false);

	const [, roster] = useRoster();

	const activeCompanyMembers = useMemo(() => {
		return roster?.filter((item) => !!item.active);
	}, [roster]);

	const inactiveCompanyMembers = useMemo(() => {
		return roster?.filter((item) => !item.active);
	}, [roster]);

	const handleAddNewCompanyMember = () => {
		setAddNewCompanyMember(true);
	};

	const handleCloseCompanyMemberDialog = () => {
		setAddNewCompanyMember(false);
	};

	const boxStyles = {
		mt: 4,
		mb: 8,
	};

	return isAdmin ? (
		<>
			<Container mb={4}>
				<Button onClick={handleAddNewCompanyMember} leftIcon={<SlPlus />}>
					New Company Member
				</Button>
			</Container>
			{!isEmpty(activeCompanyMembers) ? (
				<Box sx={{ ...boxStyles }}>
					<Heading as="h5" align="center" textTransform="uppercase">
						Active
					</Heading>
					<Text fontSize="sm" align="center" pb={2}>
						New shows will include all active company members on the sign-in sheet.
					</Text>
					<RosterTable roster={activeCompanyMembers} />
				</Box>
			) : null}
			{!isEmpty(inactiveCompanyMembers) ? (
				<Box sx={{ ...boxStyles }}>
					<Heading as="h5" align="center" textTransform="uppercase">
						Inactive
					</Heading>
					<Text fontSize="sm" align="center" pb={2}>
						Inactive company members can be added to the current show individually.
					</Text>
					<RosterTable roster={inactiveCompanyMembers} />
				</Box>
			) : null}

			<CompanyMemberDialog newCompanyMember={addNewCompanyMember} onCloseDialog={handleCloseCompanyMemberDialog} />
		</>
	) : null;
}
