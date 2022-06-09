import React, { useContext, useEffect, useState } from 'react';
import { IconButton, Popover, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import HorizontalRule from '@mui/icons-material/HorizontalRule';
import Flight from '@mui/icons-material/Flight';

import ProductionContext from '../../ProductionContext';

export default function StatusSelect({ showId, performerId, initStatus, children }) {
	const [anchorEl, setAnchorEl] = useState(null);
	const [status, setStatus] = useState('');
	const { productionDispatch } = useContext(ProductionContext);

	// Sync status to props.
	useEffect(() => {
		setStatus(initStatus);
	}, [initStatus]);

	useEffect(() => {
		if (status !== '') {
			// Only dispatch if the status has changed.
			productionDispatch({
				type: 'SET_ATTENDANCE_STATUS',
				showId,
				performerId,
				status,
			});
		}
	}, [productionDispatch, showId, performerId, status]);

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

	const handleOpenIcons = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleIconClick = (event, newValue) => {
		setStatus(newValue);
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
