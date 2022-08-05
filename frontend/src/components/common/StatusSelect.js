import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { IconButton, Popover, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import Flight from '@mui/icons-material/Flight';
import HorizontalRule from '@mui/icons-material/HorizontalRule';
import { MUTATE_UPDATE_SHOW_ATTENDANCE, QUERY_RECENT_SHOWS } from '../../lib/gql';
import { isEmpty } from 'lodash';

// TODO Only Admin can change in/out status.

export default function StatusSelect({ status, children, companyMemberId, showId }) {
	const [updateShowAttendance, { data, loading, error }] = useMutation(MUTATE_UPDATE_SHOW_ATTENDANCE);

	const [anchorEl, setAnchorEl] = useState(null);

	const buttons = [
		{
			text: 'In',
			value: 'in',
			icon: <Check />,
		},
		{
			text: 'Out',
			value: 'out',
			icon: <Close />,
		},
		{
			text: 'PD',
			value: 'pd',
			icon: <HorizontalRule />,
		},
		{
			text: 'Vac',
			value: 'vac',
			icon: <Flight />,
		},
	];

	/**
	 * Sets the anchor element for the popover.
	 *
	 * @param {Object} event onClick event.
	 */
	const handleOpenIcons = (event) => {
		setAnchorEl(event.currentTarget);
	};

	/**
	 * Fire the mutation to update a company member's status within a show.
	 *
	 * @param {Object} event onClick event.
	 * @param {string} newValue The updated value.
	 */
	const handleIconClick = (event, newValue) => {
		updateShowAttendance({
			variables: {
				input: {
					clientMutationId: 'updateShowAttendanceMutation',
					showId,
					companyMemberId,
					status: newValue,
				},
			},
			refetchQueries: [{ query: QUERY_RECENT_SHOWS }],
		});

		if (!error && !loading) setAnchorEl(null);
	};

	return (
		<>
			<IconButton
				sx={{
					width: '40px',
					borderRadius: 1,
					cursor: 'pointer',
					backgroundColor: children ? 'none' : 'primary.lightgray',
				}}
				onClick={handleOpenIcons}
				aria-haspopup="true"
			>
				{children ? children : <Typography variant="button" sx={{ px: 2, py: 1.5 }}></Typography>}
			</IconButton>
			<Popover
				open={!!anchorEl}
				anchorEl={anchorEl}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				onClose={() => setAnchorEl(null)}
			>
				<ToggleButtonGroup
					value={status}
					size="small"
					sx={{ p: 0.75 }}
					onChange={handleIconClick}
					aria-label="Attendance status choices"
					exclusive
				>
					{buttons.map((button, i) => (
						<ToggleButton
							key={i}
							value={button.value}
							variant="contained"
							sx={{ textAlign: 'center', borderRadius: 0 }}
							aria-label={button.text}
						>
							<Stack>
								{button.icon}
								<Typography variant="caption" component="p" display="block" sx={{ display: 'block' }}>
									{button.text}
								</Typography>
							</Stack>
						</ToggleButton>
					))}
				</ToggleButtonGroup>
			</Popover>
		</>
	);
}
