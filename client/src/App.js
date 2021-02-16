import './App.css';
import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom";
import Home from './components/uniqueComponents/Home';
import SignUp from './components/uniqueComponents/SignUp';
import SignIn from './components/uniqueComponents/SignIn';
import BusinessRouteConfig from './components/uniqueComponents/BusinessRouteConfig';
import AuthProvider from './providers/AuthProvider';
import CustomRoute from './CustomRoute/CustomRoute';
import MyBusiness from './components/uniqueComponents/MyBusiness/MyBusiness';
import OneProductPage from './components/uniqueComponents/OneProductPage';
import ChatViewClient from './components/uniqueComponents/ChatViewClient';
import NotFoundPage from './components/reusableComponents/NotFoundPage';


function App() {

  return (
    <AuthProvider>
      <Router>
        <Switch>
          <CustomRoute
          path='/business/chat/'
          component={ ChatViewClient }
          />
          <CustomRoute
          path='/product/'
          component={ OneProductPage }
          />
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
          <Route
          component={ NotFoundPage }
          />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
