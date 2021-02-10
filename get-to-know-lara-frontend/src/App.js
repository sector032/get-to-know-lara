import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderNavbar from './components/layout/HeaderNavbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import MainPage from './components/MainPage';

const App = () => {
	return (
		<div className='App'>
			<Router>
				<HeaderNavbar />
				<Route exact path='/home' component={MainPage}></Route>
				<Route path='/register' component={Registration}></Route>
				<Route path='/login' component={Login}></Route>
			</Router>
		</div>
	);
};

export default App;
