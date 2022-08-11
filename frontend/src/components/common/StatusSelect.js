import React, { useState } from 'react';
import { IconButton, Popover, Stack, ToggleButton, ToggleButtonGroup, Typography, Box } from '@mui/material';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import Flight from '@mui/icons-material/Flight';
import HorizontalRule from '@mui/icons-material/HorizontalRule';

import { useUpdateAttendance } from 'hooks/mutations/use-update-show-attendance';

export default function StatusSelect({ status, children, companyMemberId, showId }) {
	const {
		updateAttendanceMutation,
		results: { loading: updateAttendanceLoading, error: updateAttendanceError },
	} = useUpdateAttendance();

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
		updateAttendanceMutation({ showId, companyMemberId, status: newValue });

		if (!updateAttendanceError && !updateAttendanceLoading) setAnchorEl(null);
	};

	return (
		<>
			<IconButton
				sx={{
					width: '40px',
					borderRadius: 1,
					cursor: 'pointer',
					backgroundColor: children ? 'none' : 'primary.lightgray',
					p: 1,
				}}
				onClick={handleOpenIcons}
				aria-haspopup="true"
			>
				{children ? children : <Box sx={{ px: 0, py: 1.5 }}></Box>}
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
