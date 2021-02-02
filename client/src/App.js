import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/uniqueComponents/Home';
import SignUp from './components/uniqueComponents/SignUp';
import { signUpLink } from './constants';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>

          <Home/>

        </Route>
        <Route path={ signUpLink } exact>

          <SignUp/>

        </Route>
      </Switch>
    </Router>
  );
}

export default App;
