import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Login } from '../Login';

const HeaderNavbar = (props) => {
	let loginText = 'You are not logged in!';

	return (
		<React.Fragment>
			<Navbar bg='dark' variant='dark'>
				<Navbar.Brand href='/home'>Email</Navbar.Brand>
				<Nav className='mr-auto'>
					<Nav.Link href='/home'>Home</Nav.Link>
					<Nav.Link href='/login'>Login</Nav.Link>
					<Nav.Link href='/register'>Register</Nav.Link>
				</Nav>
				{loginText}
			</Navbar>
		</React.Fragment>
	);
};

export default HeaderNavbar;
