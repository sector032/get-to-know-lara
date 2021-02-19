import React from 'react';
import { useAccordionToggle } from 'react-bootstrap';

export default function MainPage() {
	let isLoggedIn = sessionStorage.getItem('token');
	let user = sessionStorage.getItem('username');

	const mainPage = () => {
		if (isLoggedIn) {
			return (
				<center>
					<h2>Welcome {user}!</h2>
				</center>
			);
		} else {
			return (
				<center>
					<h2>
						Hello stranger! <br />
						<br /> If you want to send emails you need to register or login
						first!
					</h2>
				</center>
			);
		}
	};

	return <React.Fragment>{mainPage()}</React.Fragment>;
}
