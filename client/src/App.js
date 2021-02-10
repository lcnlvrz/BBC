import './App.css';
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import Home from './components/uniqueComponents/Home';
import SignUp from './components/uniqueComponents/SignUp';
import SignIn from './components/uniqueComponents/SignIn';
import BusinessRouteConfig from './components/uniqueComponents/BusinessRouteConfig';
import AuthProvider from './providers/AuthProvider';
import CustomRoute from './CustomRoute/CustomRoute';
import MyBusiness from './components/uniqueComponents/MyBusiness/MyBusiness';

function App() {

  return (
    <AuthProvider>
      <Router>
        <Switch>
          <CustomRoute
          path='/search/business/'
          component={ MyBusiness }
          />
          <CustomRoute 
          exact 
          path='/' 
          component={ Home }/>
          <CustomRoute 
          condition='business'
          path='/business/' 
          component={ BusinessRouteConfig }/>
          <CustomRoute 
          exact
          condition='notLoggedIn' 
          path='/sign-in' 
          component={ SignIn }/>
          <CustomRoute 
          exact
          condition='notLoggedInSignUp' 
          component={ SignUp } 
          path='/sign-up'/>

        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
