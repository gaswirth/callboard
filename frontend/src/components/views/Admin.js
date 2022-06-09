import React from 'react';
import { Container, List, ListItem, Typography } from '@mui/material';

export default function Admin() {
	return (
		<Container sx={{ p: 4 }}>
			<Typography variant="h4">SM/CM stuff</Typography>
			<List>
				<ListItem>Select/advance current show</ListItem>
				<ListItem>Views and controls</ListItem>
				<ListItem>A bangin' playlist</ListItem>
			</List>
		</Container>
	);
}
