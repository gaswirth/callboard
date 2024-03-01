import { useContext, useState } from 'react';
import { Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';

import { User } from '@lib/classes';

import { useLoginError } from '@hooks/hooks';
import { useLoginMutation } from '@hooks/mutations/use-login-mutation';

import { AuthContext } from '@context/AuthContext';

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
			login: { status, userId, roles },
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
			<Text fontSize="2xl" textAlign="left">
				Login
			</Text>
			<form onSubmit={handleLoginSubmit}>
				<FormControl id="username" isRequired>
					<FormLabel>Username</FormLabel>
					<Input name="username" type="text" onChange={handleTextFieldChange} />
				</FormControl>
				<FormControl id="password" isRequired>
					<FormLabel>Password</FormLabel>
					<Input name="password" type="password" onChange={handleTextFieldChange} />
				</FormControl>
				<Button type="submit" mt={4}>
					Submit
				</Button>
				{errorMessage ? (
					<Text color="red.500" mt={2}>
						{errorMessage}
					</Text>
				) : null}
			</form>
		</>
	);
}
