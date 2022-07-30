import React, { useContext, useReducer, useState, useMemo, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { useQuery } from '@apollo/client';
import { Popover } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, Typography } from '@mui/material';
import StatusIcon from './StatusIcon';
import Note from './Note';
import { showLabel } from '../../lib/functions';
import { QUERY_SHOWS } from '../../lib/gql';

import ProductionContext from '../../ProductionContext';
import { useShow } from '../../lib/hooks';

function anchorElReducer(state, action) {
	switch (action.type) {
		case 'INIT': {
			var anchorEls = {};
			Object.keys(action.payload).forEach((id) => {
				anchorEls[id] = null;
			});

			return anchorEls;
		}

		case 'MOUSEENTER': {
			return {
				...state,
				[action.id]: action.payload,
			};
		}

		case 'MOUSEOUT': {
			return {
				...state,
				[action.id]: null,
			};
		}

		default:
			return state;
	}
}

export default function ShowTable({ showIds, buttonsEnabled, addlProps }) {
	const {
		production: { roster, shows, currentShowId },
		productionDispatch,
	} = useContext(ProductionContext);
	const [dataMessage, setDataMessage] = useState('');
	const [rows, setRows] = useState([]);

	const firstShow = useShow(shows, showIds[0]);

	/**
	 * Retrieve the show's data.
	 */
	const { data, loading, error } = useQuery(QUERY_SHOWS, {
		variables: { showIds },
		pollInterval: 500,
	});

	/**
	 * Retrieve and set the current show.
	 */
	useEffect(() => {
		if (data) {
			// Send Show to context.
			productionDispatch({
				type: 'SET_SHOWS',
				payload: data.shows.nodes,
			});
		}

		if (loading) setDataMessage('Loading show...');
		if (error) setDataMessage('Show Error', error.message);

		return () => setDataMessage('');
	}, [error, loading, data, productionDispatch]);

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
		anchorElDispatch({
			type: 'MOUSEENTER',
			id: event.target.getAttribute('id'),
			payload: event.currentTarget,
		});
	};

	const handlePopoverClose = (event) => {
		anchorElDispatch({
			type: 'MOUSEOUT',
			id: event.target.getAttribute('id'),
		});
	};

	/**
	 * Build the table rows.
	 */
	useEffect(() => {
		if (isEmpty(roster) || isEmpty(shows)) return;

		var rows = [];

		for (let companyMember of roster) {
			const { name, callboardRole, companyMemberId } = companyMember;

			rows.push({
				companyMemberId,
				name,
				callboardRole,
				attendance: showIds.map((showId) =>
					shows && shows[showId] ? shows[showId].attendance[companyMemberId] : null
				),
			});
		}

		setRows(rows);
	}, [roster, data, showIds, shows]);

	return isEmpty(showIds) ? (
		<Typography>{dataMessage}</Typography>
	) : (
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
									borderRightColor: 'primary.gray',
									borderRightStyle: 'solid',
									textTransform: 'uppercase',
								}}
							>
								<Typography variant="button" sx={{ fontSize: '1.1em' }}>
									Company Member
								</Typography>
							</TableCell>
							{!isEmpty(shows)
								? showIds.map((id) => {
										return shows[id] ? (
											<TableCell key={id}>
												<Typography
													variant="button"
													id={id}
													lineHeight={1.2}
													sx={{
														cursor: 'default',
														display: 'block',
														p: 1,
														borderRadius: 1,
														backgroundColor:
															String(currentShowId) === id && showIds.length > 1 ? 'secondary.main' : 'inherit',
														fontSize: '1.1em',
													}}
													aria-haspopup="true"
													onMouseEnter={handlePopoverOpen}
													onMouseLeave={handlePopoverClose}
												>
													{showLabel(shows[id].datetime)}
												</Typography>
												<Popover
													sx={{ pointerEvents: 'none' }}
													open={!!anchorEl[id]}
													anchorEl={anchorEl[id]}
													anchorOrigin={{
														vertical: 'bottom',
														horizontal: 'left',
													}}
													onClose={handlePopoverClose}
													disableRestoreFocus
												>
													{shows[id]?.notes ? (
														<Typography sx={{ p: 2 }}>{shows[id].notes}</Typography>
													) : (
														<Typography sx={{ p: 2, color: 'primary.gray' }}>No notes.</Typography>
													)}
												</Popover>
											</TableCell>
										) : (
											''
										);
								  })
								: null}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow key={row.name}>
								<TableCell
									sx={{
										pt: 0.75,
										pr: 3,
										pb: 0,
										pl: 0,
										borderRightWidth: 1,
										borderRightColor: 'primary.gray',
										borderRightStyle: 'solid',
										textAlign: 'right',
									}}
									scope="row"
								>
									<Typography variant="body1" sx={{ lineHeight: 1 }}>
										{row.name}
									</Typography>
									<Typography variant="caption" sx={{ fontStyle: 'italic' }}>
										{row.role}
									</Typography>
								</TableCell>

								{showIds.map((id, i) => (
									<TableCell key={id} scope="row" sx={{ pt: 2.1 }}>
										<StatusIcon
											status={row.attendance[i] ? row.attendance[i] : ''}
											companyMemberId={row.companyMemberId}
											showId={id}
											buttonEnabled={id === currentShowId ? true : false}
										/>
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			{showIds.length === 1 && firstShow ? <Note>{firstShow.notes ? firstShow.notes : 'No notes.'}</Note> : null}
		</>
	);
}
