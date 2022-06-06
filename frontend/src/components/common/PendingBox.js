import React, { useState } from 'react';
import { Button, Popover, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import HorizontalRule from '@mui/icons-material/HorizontalRule';
import Flight from '@mui/icons-material/Flight';

export default function PendingBox() {
	const [anchorEl, setAnchorEl] = useState(null);
	const [status, setStatus] = useState('');

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

	const handleIconClick = (event) => {
		setStatus(event.currentTarget.value);
	};

	return (
		<>
			<Button
				sx={{
					width: '40px',
					backgroundColor: 'primary.lightgray',
					borderRadius: 1,
					cursor: 'pointer',
				}}
				onClick={handleOpenIcons}
				aria-haspopup="true"
			>
				Set
			</Button>
			<Popover
				open={!!anchorEl}
				anchorEl={anchorEl}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				onClose={() => setAnchorEl(null)}
			>
				<ToggleButtonGroup value={status} size="small">
					{buttons.map((button, i) => (
						<ToggleButton
							key={i}
							value={button.value}
							variant="contained"
							sx={{ textAlign: 'center', borderRadius: 0 }}
							onClick={handleIconClick}
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
