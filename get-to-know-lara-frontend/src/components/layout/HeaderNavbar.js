import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const HeaderNavbar = (props) => {
	let loginText = 'You are not logged in!';
	let isLoggedIn = sessionStorage.getItem('token');

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
			<Navbar bg='dark' variant='dark' expand='lg'>
				<Navbar.Brand href='#home'>CoolMail</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='mr-auto'>
						<Nav.Link href='/home'>Home</Nav.Link>
						<Nav.Link href='/login'>Login</Nav.Link>
						<Nav.Link href='/register'>Register</Nav.Link>
						{isLoggedIn && (
							<NavDropdown title='Email' id='basic-nav-dropdown'>
								<NavDropdown.Item href='/mail/send'>
									Send Email
								</NavDropdown.Item>
								<NavDropdown.Item href='/mail/inbox'>Inbox</NavDropdown.Item>
								<NavDropdown.Item href='/mail/sent'>Sent</NavDropdown.Item>
								<NavDropdown.Item href='/mail/mark-as-unread'>
									Unread
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href='/logout' onClick={handleLogout}>
									Logout
								</NavDropdown.Item>
							</NavDropdown>
						)}
					</Nav>
				</Navbar.Collapse>
				<span style={{ color: 'white' }}>{loginText}</span>
			</Navbar>
		</React.Fragment>
	);
};

export default HeaderNavbar;
