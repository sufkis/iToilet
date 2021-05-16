import './App.css';
import Signup from './components/signup';
import { AuthProvider } from "./contexts/Auth"
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Map from './Map';

function App() {

// useAuth to deconstruct: currentUser, googleSignIn, login, logout from useAuth() hook
  // currentUser is null if no one is logged in, and signup also logs you in.

  const AppRouter = () => {

    return (
      <Router>
        <Switch>
          <Route exact path='/signup'>
            <Signup />
          </Route>
          <Route exact path='/'>
            <Map />
          </Route>
        </Switch>
      </Router>
    )
  }

  return (
    <>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
    </>
  );
}

export default App;
