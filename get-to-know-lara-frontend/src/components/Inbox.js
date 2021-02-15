import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Navbar';

const Inbox = (params) => {
	const [email, setUserEmail] = useState([]);
	const [id, setID] = useState('');

	// const handleDelete = (event) => {
	// 	setID(event.target.value);
	// };

	let config = {
		headers: {
			Authorization: 'Bearer ' + sessionStorage.getItem('token'),
		},
	};

	useEffect(() => {
		axios
			.get('http://127.0.0.1:8000/api/mail/inbox', config)
			.then((response) => {
				console.log(response.data.mail);
				setUserEmail(response.data.mail);
			});
	}, []);

	// axios
	// 		.post(
	// 			'http://127.0.0.1:8000/api/mail/delete',
	// 			{
	// 				email_id: id,
	// 			},
	// 			config
	// 		)
	// 		.then((response) => {
	// 			console.log(response);
	// 		}
	const handleDeleteEvent = (event) => {
		event.preventDefault();
		axios
			.post(
				'http://127.0.0.1:8000/api/mail/delete',
				{
					email_id: id,
				},
				config
			)
			.then((response) => {
				alert('Deleted!');
			})
			.catch(function (error) {
				alert(error);
			});
	};

	const getEmails = () => {
		if (email.length >= 0) {
			return email.map((item) => (
				<div>
					{item.id}
					<br />

					{item.subject}
					<br />

					{item.message}
					<br />

					{item.sent}
					<br />
					<br />
					<input type='checkbox' checked={item.is_read} />
					{item.is_read}
					<br />
					<br />
					<button onClick={handleDeleteEvent} value={item.id}>
						Delete
					</button>
				</div>
			));
		} else {
			return <h1>You don't have emails yet!</h1>;
		}
	};

	return (
		<React.Fragment>
			<h2>{getEmails()}</h2>
		</React.Fragment>
	);
};

export default Inbox;
