import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import axios from 'axios';

const Login = (params) => {
	const [userEmail, setEmail] = useState('');
	const [userPassword, setPassword] = useState('');

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleLogin = (event) => {
		event.preventDefault();
		axios
			.post('http://127.0.0.1:8000/api/login', {
				email: userEmail,
				password: userPassword,
			})
			.then((response) => {
				console.log(response);
				sessionStorage.setItem('token', response.data.token);
				sessionStorage.setItem('username', response.data.user.name);
				sessionStorage.setItem('id', response.data.user.id);
				window.location.href = '/mail/inbox';
				alert('You logged in!');
			})
			.catch(function (error) {
				alert(error);
			});
	};

	return (
		<Form onSubmit={handleLogin}>
			<Form.Group controlId='formBasicEmail'>
				<Form.Label>Email address</Form.Label>
				<Form.Control
					type='email'
					placeholder='Enter email'
					onChange={handleEmailChange}
				/>
			</Form.Group>

			<Form.Group controlId='formBasicPassword'>
				<Form.Label>Password</Form.Label>
				<Form.Control
					type='password'
					placeholder='Password'
					onChange={handlePasswordChange}
				/>
			</Form.Group>
			<Button variant='primary' type='submit'>
				Login
			</Button>
		</Form>
	);
};

export default Login;
