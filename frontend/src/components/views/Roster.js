import React, { useContext, useState, useMemo } from 'react';

import { useRoster } from 'hooks/queries/use-roster';

import { AuthContext } from 'context/AuthContext';
import RosterTable from 'components/common/RosterTable';
import { Box } from '@mui/system';
import { Fab, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { Add } from '@mui/icons-material';
import NewCompanyMember from 'components/common/NewCompanyMember';

export default function Roster() {
	const {
		user: { isAdmin },
	} = useContext(AuthContext);
	const [newCompanyMember, setNewCompanyMember] = useState(false);

	const { preparedData } = useRoster();

	const activeCompanyMembers = useMemo(() => {
		return preparedData?.filter((item) => !!item.active);
	}, [preparedData]);

	const inactiveCompanyMembers = useMemo(() => {
		return preparedData?.filter((item) => !item.active);
	}, [preparedData]);

	const handleNewCompanyMember = () => {
		setNewCompanyMember(true);
	};

	return isAdmin ? (
		<>
			{newCompanyMember ? (
				<NewCompanyMember setIsOpen={setNewCompanyMember} />
			) : (
				<Fab color="primary" aria-label="Add new Company Member" onClick={handleNewCompanyMember}>
					<Add />
				</Fab>
			)}
			{!isEmpty(activeCompanyMembers) ? (
				<Box>
					<Typography variant="h5" align="center" textTransform="uppercase">
						Active
					</Typography>
					<RosterTable roster={activeCompanyMembers} />
				</Box>
			) : null}
			{!isEmpty(inactiveCompanyMembers) ? (
				<Box>
					<Typography variant="h5" align="center" textTransform="uppercase">
						Inactive
					</Typography>
					<RosterTable roster={inactiveCompanyMembers} />
				</Box>
			) : null}
		</>
	) : null;
}
