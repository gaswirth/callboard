import React, { useContext, useReducer, useState, useMemo, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { useQuery, gql } from '@apollo/client';
import { Popover } from '@mui/material';
import { isAfter } from 'date-fns';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, Typography } from '@mui/material';
import StatusIcon from './StatusIcon';
import { showLabel } from '../../lib/functions';

import ProductionContext from '../../ProductionContext';

const QUERY_SHOWS = gql`
	query Shows($showIds: [ID] = "") {
		shows(where: { in: $showIds }) {
			nodes {
				databaseId
				showData {
					datetime
					attendance {
						companyMember {
							... on CompanyMember {
								databaseId
							}
						}
						status
					}
				}
			}
		}
	}
`;

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
	 * Check if a show is in the future.
	 *
	 * @param {String} showId
	 * @returns {Boolean} True if the show is in the future, false otherwise.
	 */
	const showInFuture = (showId) => {
		var future = true;

		if (showId !== currentShowId && isAfter(shows[showId].datetime, shows[currentShowId].datetime)) {
			future = false;
		}

		return future;
	};

	/**
	 * Build the table rows.
	 */
	useEffect(() => {
		if (isEmpty(roster) || isEmpty(shows)) return;

		var rows = [];

		for (let performer of roster) {
			const { name, role, id: performerId } = performer;

			rows.push({
				name: name,
				role: role,
				id: performerId,
				attendance: showIds.map((showId) => {
					return shows ? shows[showId].attendance[performerId] : null;
				}),
			});
		}

		setRows(rows);
	}, [roster, data, showIds, shows]);

	return isEmpty(showIds) ? (
		<Typography>{dataMessage}</Typography>
	) : (
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
								Performer
							</Typography>
						</TableCell>
						{!isEmpty(shows)
							? showIds.map((id) => {
									return (
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
													opacity: isAfter(shows[id].datetime, shows[currentShowId].datetime) ? 0.4 : 1,
												}}
												aria-haspopup="true"
												onMouseEnter={showInFuture(id) ? handlePopoverOpen : null}
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
								<TableCell key={id} scope="row">
									<StatusIcon
										status={row.attendance[i] ? row.attendance[i] : ''}
										performer={row.id}
										showId={id}
										buttonEnabled={buttonsEnabled !== false && showInFuture(id)}
									/>
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
