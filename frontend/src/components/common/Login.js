import React, { useContext, useState } from 'react';
import { Button, FormGroup, TextField, Typography } from '@mui/material';

import { useLoginError } from 'hooks/hooks';
import { useLoginMutation } from 'hooks/mutations/use-login-mutation';

import { AuthContext } from 'context/AuthContext';
import { User } from 'lib/classes';

export default function Login() {
	const { setUser } = useContext(AuthContext);
	const [errorCode, setErrorCode] = useState('');
	const [credentials, setCredentials] = useState({});
	const { loginMutation } = useLoginMutation();

	const handleTextFieldChange = (e) => {
		setCredentials({
			...credentials,
			[e.target.name]: e.target.value,
		});
	};

	const onLogin = ({ data }) => {
		const {
			loginWithCookies: { status, userId, roles },
		} = data;

		if ('SUCCESS' === status) {
			setUser(new User(userId, roles));
		}
	};

	const errorMessage = useLoginError(errorCode);

	const handleLoginSubmit = (e) => {
		e.preventDefault();

		loginMutation(credentials)
			.then(onLogin)
			.catch((errors) => setErrorCode(errors.message));
	};

	return (
		<>
			<Typography variant="h5" textAlign="left">
				Login
			</Typography>
			<form onSubmit={handleLoginSubmit}>
				<FormGroup>
					<TextField
						name="username"
						label="Username"
						type="text"
						variant="standard"
						required={true}
						sx={{ py: 1 }}
						onChange={handleTextFieldChange}
					/>
					<TextField
						name="password"
						label="Password"
						type="password"
						variant="standard"
						required={true}
						sx={{ py: 1 }}
						onChange={handleTextFieldChange}
					/>
					<Button type="submit" variant="contained" sx={{ py: 1 }}>
						Submit
					</Button>
					{errorMessage ? (
						<Typography variant="body2" sx={{ color: 'warning.main', my: 1 }}>
							{errorMessage}
						</Typography>
					) : null}
				</FormGroup>
			</form>
		</>
	);
}
