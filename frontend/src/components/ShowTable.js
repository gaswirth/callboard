import React, { useReducer, useState, useMemo, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { Popover } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, Typography } from '@mui/material';

import StatusIcon from './StatusIcon';
import { showLabel } from 'lib/functions';

import { useActiveRoster } from 'hooks/queries/use-active-roster';

function anchorElReducer(state, action) {
	switch (action.type) {
		case 'INIT': {
			var anchorEls = {};
			Object.values(action.payload).forEach((value) => {
				const { id } = value;
				anchorEls[id] = null;
			});

			return anchorEls;
		}

		case 'OPEN': {
			return {
				...state,
				[action.id]: action.payload,
			};
		}

		case 'CLOSE': {
			return {
				...state,
				[action.id]: null,
			};
		}

		default:
			return state;
	}
}

export default function ShowTable({ shows, iconButtonsDisabled, popoverDisabled, addlProps, showQRButton }) {
	const { preparedData: roster } = useActiveRoster();
	const [rows, setRows] = useState([]);

	const [anchorEl, anchorElDispatch] = useReducer(anchorElReducer, {});

	// Inialize anchorEls
	const anchorEls = useMemo(() => {
		if (isEmpty(shows)) return {};

		return { type: 'INIT', payload: shows };
	}, [shows]);

	useEffect(() => {
		anchorElDispatch(anchorEls);
	}, [anchorEls]);

	const handlePopoverOpen = (event) => {
		if (popoverDisabled) return;

		anchorElDispatch({
			type: 'OPEN',
			id: event.target.getAttribute('id'),
			payload: event.target,
		});
	};

	const handlePopoverClose = (event) => {
		if (popoverDisabled) return;

		anchorElDispatch({
			type: 'CLOSE',
			id: event.target.getAttribute('id'),
		});
	};

	/**
	 * Build the table rows.
	 */
	useEffect(() => {
		if (isEmpty(roster) || isEmpty(shows)) return;

		const attendance = shows.map((show) => show.attendance);

		var rows = [];

		for (let companyMember of roster) {
			const { firstName, lastName, role, id } = companyMember;

			rows.push({
				companyMemberId: id,
				firstName,
				lastName,
				role,
				attendance: shows.map((show, index) => attendance[index][id]),
			});
		}

		setRows(rows);
	}, [roster, shows]);

	return !isEmpty(shows) ? (
		<>
			<TableContainer component={Card} sx={{ width: '100%' }} {...addlProps}>
				<Table aria-label="show attendance table">
					<TableHead>
						<TableRow>
							<TableCell
								sx={{
									flexShrink: 1,
									flexGrow: 1,
									textAlign: 'right',
									borderRightWidth: 1,
									borderRightColor: 'neutral.gray',
									borderRightStyle: 'solid',
									textTransform: 'uppercase',
								}}
							>
								<Typography variant="button" sx={visuallyHidden}>
									Company Member
								</Typography>
							</TableCell>
							{shows.map((show, index) => {
								const { id, datetime, notes } = show;

								return (
									<TableCell key={index} id={id} onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
										<Typography
											variant="button"
											lineHeight={1.2}
											sx={{
												cursor: 'default',
												display: 'block',
												borderRadius: 1,
												fontSize: '1.1em',
											}}
										>
											{showLabel(datetime).date}
											<br />
											{showLabel(datetime).time}
										</Typography>
										<Popover
											open={!!anchorEl[id]}
											anchorEl={anchorEl[id]}
											anchorOrigin={{
												vertical: 'bottom',
												horizontal: 'left',
											}}
											onClose={handlePopoverClose}
											disableRestoreFocus
											sx={{ pointerEvents: 'none' }}
										>
											{show.notes ? (
												<Typography sx={{ p: 2 }}>{notes}</Typography>
											) : (
												<Typography sx={{ p: 2, color: 'neutral.gray' }}>No notes.</Typography>
											)}
										</Popover>
									</TableCell>
								);
							})}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row, index) => (
							<TableRow key={index}>
								<TableCell
									sx={{
										pt: 1.5,
										pr: 3,
										pb: 1,
										pl: 0,
										borderRightWidth: 1,
										borderRightColor: 'neutral.gray',
										borderRightStyle: 'solid',
										textAlign: 'right',
									}}
									scope="row"
								>
									<Typography variant="body1" sx={{ lineHeight: 1 }}>
										{`${row.firstName} ${row.lastName}`}
									</Typography>
									<Typography variant="caption">{row.role}</Typography>
								</TableCell>

								{shows.map((show, index) => {
									const { id } = show;

									return (
										<TableCell key={index} scope="row">
											<StatusIcon
												status={row.attendance[index] ? row.attendance[index] : ''}
												companyMemberId={row.companyMemberId}
												showId={id}
												buttonDisabled={iconButtonsDisabled}
											/>
										</TableCell>
									);
								})}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	) : (
		''
	);
}
