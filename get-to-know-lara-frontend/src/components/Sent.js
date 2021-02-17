import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const Sent = (params) => {
	const [email, setUserEmail] = useState([]);

	let config = {
		headers: {
			Authorization: 'Bearer ' + sessionStorage.getItem('token'),
		},
	};

	useEffect(() => {
		axios
			.get('http://127.0.0.1:8000/api/mail/sent', config)
			.then((response) => {
				setUserEmail(response.data.mail);
			});
	}, []);

	const getEmails = () => {
		if (email.length >= 0) {
			return email.map((item) => (
				<tr key={item.id}>
					<td>{item.id}</td>
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
				<thead>
					<tr>
						<th>ID</th>
						<th>Subject</th>
						<th>Message</th>
						<th>Sent</th>
					</tr>
				</thead>
				<tbody>{getEmails()}</tbody>
			</Table>
		</React.Fragment>
	);
};

export default Sent;
