import { useRef, useState } from 'react';
import './App.css';
import Signup from './components/signup';
import { useAuth } from "./contexts/Auth"

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const  { signup, currentUser, googleSignIn } = useAuth(); //also can deconstruct: currentUser, googleSignIn, login, logout from useAuth() hook
  // currentUser is null if no one is logged in, and signup also logs you in.

  const handleSignUpClick = async () => {
    setLoading(true);
    setError('');
    try {
      // all functions from useAuth() return a promise and should always be in a try & catch.
      await signup(emailRef.current.value, passwordRef.current.value);
      console.log(currentUser);
    }
    catch (err) {
      setError('Failed to create account');
      console.error(err);
    }
    finally {
      setLoading(false);
    }
  }


  return (
    <div className="App">

      <Signup />
      </div>
  );
}

export default App;
