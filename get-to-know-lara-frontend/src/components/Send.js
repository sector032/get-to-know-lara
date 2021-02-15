import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import axios from 'axios';

const Send = (params) => {
	const [subject, setSubject] = useState('');
	const [message, setMessage] = useState('');
	const [to, setTo] = useState('');

	const handleSubjectChange = (event) => {
		setSubject(event.target.value);
	};

	const handleMessageChange = (event) => {
		setMessage(event.target.value);
	};

	const handleToChange = (event) => {
		setTo(event.target.value);
	};

	let config = {
		headers: {
			Authorization: 'Bearer ' + sessionStorage.getItem('token'),
		},
	};

	const handleSend = (event) => {
		event.preventDefault();
		axios
			.post(
				'http://127.0.0.1:8000/api/mail/send',
				{
					id_user_to: to,
					subject: subject,
					message: message,
				},
				config
			)
			.then((response) => {
				alert('Email Sent!');
			})
			.catch(function (error) {
				alert(error);
			});
	};

	return (
		<Form onSubmit={handleSend}>
			<Form.Group controlId='formBasicID'>
				<Form.Label>ID</Form.Label>
				<Form.Control
					type='integer'
					placeholder='Enter an ID'
					onChange={handleToChange}
				/>
			</Form.Group>

			<Form.Group controlId='formBasicSubject'>
				<Form.Label>Subject</Form.Label>
				<Form.Control type='text' onChange={handleSubjectChange} />
			</Form.Group>
			<Form.Group controlId='formBasicMessage'>
				<Form.Label>Message</Form.Label>
				<Form.Control type='text' onChange={handleMessageChange} />
			</Form.Group>
			<Button variant='primary' type='submit'>
				Send
			</Button>
		</Form>
	);
};

export default Send;
