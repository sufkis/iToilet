import { useRef, useState } from 'react';
import './App.css';
import { useAuth } from "./contexts/Auth"

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const  { signup, currentUser } = useAuth(); //also can deconstruct: currentUser, googleSignIn, login, logout from useAuth() hook
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
      {/* Feel free to delete this and make it better.
      I'm leaving it here to give you an example of how it works and for testing. */}
      <h1>Sign up testing</h1> 
      <label htmlFor="email">Email</label>
      <input type="text" name="email" id="email" ref={emailRef} />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" ref={passwordRef} />
      <button onClick={handleSignUpClick}>signup</button>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default App;
