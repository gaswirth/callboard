import React, { useContext, useEffect, useState, useMemo } from 'react';
import ShowTable from '../common/ShowTable';
import Note from '../common/Note';

import ProductionContext from '../../ProductionContext';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { Show } from '../../lib/classes';

export default function Now({ admin }) {
	const { production, productionDispatch } = useContext(ProductionContext);
	const { currentShowId, shows } = production;
	const [currentShow, setCurrentShow] = useState(new Show());
	const [notes, setNotes] = useState('');

	const show = useMemo(() => {
		if (!shows) return;

		return shows[currentShowId];
	}, [shows, currentShowId]);

	/**
	 * Set the current
	 */
	useEffect(() => {
		if (!currentShowId) return;

		setCurrentShow(show);
	}, [currentShowId, show]);

	useEffect(() => {
		setNotes(currentShow.notes);
	}, [currentShow.notes]);

	const handleNotesChange = (event) => {
		setNotes(event.target.value);
	};

	const handleNotesSubmit = (event) => {
		productionDispatch({
			type: 'SET_SHOW_NOTES',
			showId: currentShow.id,
			notes,
		});
	};

	const handleNotesCancel = (event) => {
		setNotes(currentShow.notes);
	};

	return (
		<>
			<ShowTable showIds={[currentShowId]} buttonsEnabled={!!admin} />
			<Note title="Notes:">
				{admin && notes !== undefined ? (
					<Stack spacing={2}>
						<TextField
							id="notes-input"
							label="Notes"
							variant="outlined"
							multiline
							value={notes}
							onChange={handleNotesChange}
						/>
						<Stack direction="row" spacing={2}>
							{currentShow.notes === notes ? null : (
								<Button onClick={handleNotesCancel} id="notes-cancel" variant="contained">
									Cancel
								</Button>
							)}
							<Button onClick={handleNotesSubmit} id="notes-submit" variant="contained" sx={{ alignSelf: 'flex-end' }}>
								Save
							</Button>
						</Stack>
					</Stack>
				) : notes ? (
					<Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
						{notes}
					</Typography>
				) : null}
			</Note>
		</>
	);
}
