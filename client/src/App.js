import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/uniqueComponents/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>

          <Home/>

        </Route>
      </Switch>
    </Router>
  );
}

export default App;
