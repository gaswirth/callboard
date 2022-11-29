import React, { useContext, useState, useMemo } from 'react';

import { useRoster } from 'hooks/queries/use-roster';

import { AuthContext } from 'context/AuthContext';
import RosterTable from 'components/RosterTable';
import { Box, Container } from '@mui/system';
import { Fab, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { Add } from '@mui/icons-material';
import CompanyMemberDialog from 'components/CompanyMemberDialog';

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

	return isAdmin ? (
		<>
			{!isEmpty(activeCompanyMembers) ? (
				<Box>
					<Typography variant="h5" align="center" textTransform="uppercase">
						Active
					</Typography>
					<Typography variant="body2" align="center">
						New shows will include all active company members on the sign-in sheet.
					</Typography>
					<RosterTable roster={activeCompanyMembers} />
				</Box>
			) : null}
			{!isEmpty(inactiveCompanyMembers) ? (
				<Box>
					<Typography variant="h5" align="center" textTransform="uppercase">
						Inactive
					</Typography>
					<Typography variant="body2" align="center">
						Inactive company members can be added to the current show individually.
					</Typography>
					<RosterTable roster={inactiveCompanyMembers} />
				</Box>
			) : null}

			<Container align="center">
				<Fab color="primary" aria-label="Add new Company Member" onClick={handleAddNewCompanyMember}>
					<Add />
				</Fab>
			</Container>

			<CompanyMemberDialog newCompanyMember={addNewCompanyMember} onCloseDialog={handleCloseCompanyMemberDialog} />
		</>
	) : null;
}
