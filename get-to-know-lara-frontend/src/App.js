import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderNavbar from './components/layout/HeaderNavbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import MainPage from './components/MainPage';
import Inbox from './components/Inbox';
import Sent from './components/Sent';
import Send from './components/Send';

const App = () => {
	return (
		<div className='App'>
			<Router>
				<HeaderNavbar />
				<Route exact path='/home' component={MainPage}></Route>
				<Route path='/register' component={Registration}></Route>
				<Route path='/login' component={Login}></Route>
				<Route path='/mail/inbox' component={Inbox}></Route>
				<Route path='/mail/sent' component={Sent}></Route>
				<Route path='/mail/send' component={Send}></Route>
			</Router>
		</div>
	);
};

export default App;
