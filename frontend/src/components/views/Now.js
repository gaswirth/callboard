import React, { useContext, useEffect, useState, useMemo } from 'react';
import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import ShowTable from '../common/ShowTable';
import Note from '../common/Note';

import ProductionContext from '../../ProductionContext';

export default function Now({ userIsAdmin }) {
	const {
		production: { currentShowId, shows },
		productionDispatch,
	} = useContext(ProductionContext);
	const [currentShow, setCurrentShow] = useState(null);
	const [notes, setNotes] = useState('');

	const show = useMemo(() => {
		if (!shows) return;

		return shows[currentShowId];
	}, [shows, currentShowId]);

	/**
	 * Set the current show.
	 */
	useEffect(() => {
		if (!currentShowId) return;

		setCurrentShow(show);
	}, [currentShowId, show]);

	/**
	 * Set the show notes state.
	 */
	useEffect(() => {
		if (currentShow) {
			setNotes(currentShow.notes);
		}
	}, [currentShow]);

	const handleNotesChange = (event) => {
		setNotes(event.target.value);
	};

	const handleNotesSubmit = (event) => {
		productionDispatch({
			type: 'SET_SHOW_NOTES',
			showId: currentShowId,
			notes,
		});
	};

	const handleNotesCancel = (event) => {
		setNotes(currentShow.notes);
	};

	return (
		<Container sx={{ width: '100%', maxWidth: 400 }}>
			{currentShowId ? <ShowTable showIds={[currentShowId]} buttonsEnabled={!!userIsAdmin} /> : null}
			<Note>
				{userIsAdmin && notes !== undefined ? (
					<Stack spacing={2}>
						{!userIsAdmin ? (
							<Typography variant="subtitle1" component="h3" sx={{ fontWeight: 700 }}>
								Notes
							</Typography>
						) : null}
						<TextField
							id="notes-input"
							label="Notes"
							variant="outlined"
							multiline
							value={notes}
							onChange={handleNotesChange}
						/>
						<Stack direction="row" spacing={2}>
							{currentShow?.notes === notes ? null : (
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
		</Container>
	);
}
