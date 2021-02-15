import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Navbar';

const Inbox = (params) => {
	const [email, setUserEmail] = useState([]);

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
