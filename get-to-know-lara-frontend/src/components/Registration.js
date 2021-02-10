import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';

const Registration = (params) => {
	const [userEmail, setEmail] = useState('');
	const [userName, setName] = useState('');
	const [userPassword, setPassword] = useState('');

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleRegistration = (event) => {
		event.preventDefault();
		axios
			.post('http://127.0.0.1:8000/api/registration', {
				name: userName,
				email: userEmail,
				password: userPassword,
			})
			.then((response) => {
				console.log(response);
				window.location.href = '/';
			})
			.catch(function (error) {
				alert(error);
			});
	};

	return (
		<Form onSubmit={handleRegistration}>
			<Form.Group>
				<Form.Label>Username</Form.Label>
				<Form.Control
					type='text'
					placeholder='Username'
					onChange={handleNameChange}
				/>
			</Form.Group>
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
				Register
			</Button>
		</Form>
	);
};

export default Registration;
