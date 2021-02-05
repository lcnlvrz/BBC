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
import { myBusinessLink, signInLink, signUpLink, welcomeUserLink } from './constants/pathsRouter';
import SignIn from './components/uniqueComponents/SignIn';
import MyBusiness from './components/uniqueComponents/MyBusiness';
import WelcomeBusiness from './components/uniqueComponents/WelcomeBusiness';
import OneProductPage from './components/uniqueComponents/OneProductPage';
import BusinessRouteConfig from './components/uniqueComponents/BusinessRouteConfig';

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
        <Route path={ signInLink } exact>

          <SignIn/>

        </Route>
        <Route path={ myBusinessLink } exact>

          <MyBusiness/>

        </Route>
        <Route path={ welcomeUserLink } exact>
          <WelcomeBusiness/>
        </Route>
        
        <Route path='/nike/product/' exact>
        
          <OneProductPage/>

        </Route>

        <Route path='/business/'>

          <BusinessRouteConfig/>

        </Route>

      </Switch>
    </Router>
  );
}

export default App;
