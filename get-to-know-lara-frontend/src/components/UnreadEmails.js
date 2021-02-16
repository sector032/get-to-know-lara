import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const UnreadEmails = (params) => {
	const [email, setUserEmail] = useState([]);

	let config = {
		headers: {
			Authorization: 'Bearer ' + sessionStorage.getItem('token'),
		},
	};

	useEffect(() => {
		axios
			.get('http://127.0.0.1:8000/api/mail/mark-as-unread', config)
			.then((response) => {
				setUserEmail(response.data.mail);
			});
	}, []);

	const getEmails = () => {
		if (email.length >= 0) {
			return email.map((item) => (
				<tr>
					<td key={item.id}>{item.id}</td>
					<td>{item.id_user_from}</td>
					<td>{item.subject}</td>
					<td>{item.message}</td>
					<td>{item.sent}</td>
				</tr>
			));
		} else {
			return <h1>You don't have emails yet!</h1>;
		}
	};

	return (
		<React.Fragment>
			<Table>
				<tr>
					<th>ID</th>
					<th>From</th>
					<th>Subject</th>
					<th>Message</th>
					<th>Sent</th>
				</tr>
				{getEmails()}
			</Table>
		</React.Fragment>
	);
};

export default UnreadEmails;
