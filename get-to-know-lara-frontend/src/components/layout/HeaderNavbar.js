import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Login } from '../Login';

const HeaderNavbar = (props) => {
	let loginText = 'You are not logged in!';

	if (sessionStorage.getItem('token')) {
		loginText = 'You are logged in as: ' + sessionStorage.getItem('username');
	}

	const handleLogout = () => {
		alert('Logout');
		sessionStorage.clear();
		window.location.href = '/';
	};
	return (
		<React.Fragment>
			<Navbar bg='dark' variant='dark'>
				<Navbar.Brand href='/'>Email</Navbar.Brand>
				<Nav className='mr-auto'>
					<Nav.Link href='/home'>Home</Nav.Link>
					<Nav.Link href='/login'>Login</Nav.Link>
					<Nav.Link href='/register' name='register'>
						Register
					</Nav.Link>
					<Nav.Link href='/mail/send' name='send'>
						Send
					</Nav.Link>
					<Nav.Link href='/mail/inbox' name='inbox'>
						Inbox
					</Nav.Link>
					<Nav.Link href='/mail/sent' name='sent'>
						Sent
					</Nav.Link>
					<Nav.Link href='/logout' onClick={handleLogout}>
						Logout
					</Nav.Link>
				</Nav>
				{loginText}
			</Navbar>
		</React.Fragment>
	);
};

export default HeaderNavbar;
