//import logo from './logo.svg';
import './App.css';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import AddEvent from './pages/addEvent';
import EditEvent from './pages/editEvent';
import DeleteEventAlert from './components/DeleteEventAlert';
import ListEvents from './pages/listEvents';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Router>
          <Route path="/" component={SignIn} exact/>
          <Route path="/register" component={Register} />
          <ProtectedRoute path="/list" component={ListEvents} />
          <ProtectedRoute path="/add" component={AddEvent} />
          <ProtectedRoute path="/edit/:id" component={EditEvent} />
          <ProtectedRoute path="/delete/:id" component={DeleteEventAlert} />
      </Router>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
