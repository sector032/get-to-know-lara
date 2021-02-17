import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const Inbox = (params) => {
	const [email, setUserEmail] = useState([]);
	const [id, setID] = useState('');
	const [checkbox, setCheckbox] = useState('');

	const handleCheckBox = (event) => {
		setCheckbox(event.target.value);

		axios
			.post(
				'http://127.0.0.1:8000/api/mail/mark-as-unread',
				{
					email_id: checkbox,
				},
				config
			)
			.then((response) => {
				console.log(response);
				//alert('Marked!');
			})
			.catch(function (error) {
				alert(error);
			});
	};

	const handleDelete = (event) => {
		setID(event.target.value);
		axios
			.post(
				'http://127.0.0.1:8000/api/mail/delete',
				{
					email_id: id,
				},
				config
			)
			.then((response) => {
				console.log(response);
				alert('Deleted!');
			})
			.catch(function (error) {
				alert(error);
			});
	};

	let config = {
		headers: {
			Authorization: 'Bearer ' + sessionStorage.getItem('token'),
		},
	};

	useEffect(() => {
		axios
			.get('http://127.0.0.1:8000/api/mail/inbox', config)
			.then((response) => {
				setUserEmail(response.data.mail);
			});
	}, []);

	const getEmails = () => {
		if (email.length >= 1) {
			return email.map((item) => (
				<tr key={item.id}>
					<td>{item.id}</td>
					<td>{item.id_user_from}</td>
					<td>{item.subject}</td>
					<td>{item.message}</td>
					<td>{item.sent}</td>
					<td>
						<input
							value={item.id}
							onClick={handleCheckBox}
							type='checkbox'
						></input>
					</td>
					<td>
						<button value={item.id} onClick={handleDelete}>
							Delete
						</button>
					</td>
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
						<th>From</th>
						<th>Subject</th>
						<th>Message</th>
						<th>Sent</th>
						<th>Unread</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>{getEmails()}</tbody>
			</Table>
		</React.Fragment>
	);
};

export default Inbox;
