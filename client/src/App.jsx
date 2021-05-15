import './App.css';
import Signup from './components/signup';
import { AuthProvider } from "./contexts/Auth"
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {

// useAuth to deconstruct: currentUser, googleSignIn, login, logout from useAuth() hook
  // currentUser is null if no one is logged in, and signup also logs you in.


  return (
    <>
    <Signup />
    </>
  );
}

export default App;
