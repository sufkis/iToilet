import { useState } from "react"
import { useHistory } from "react-router";
import { useAuth } from "../contexts/Auth";


const Login = () => {

    const { login, googleSignIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function handleGoogleSignIn () {
        try {
            await googleSignIn()
        } catch (err) {
            console.error(err);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            history.push('/')
        } catch(err) {
            console.error(err)
        }
    }

    return(
        <>
        <div className="container w-50">
            <h1>Login</h1>
            <form onSubmit={handleLogin} className="form-group">
                <label htmlFor="email">Email: </label>
                <input 
                className="form-control mt-1"
                type="email"
                value={email}
                onChange={e=> setEmail(e.target.value)}
                />
                <label htmlFor="email">Password: </label>
                <input 
                className="form-control mt-1"
                type="email"
                value={password}
                onChange={e=> setPassword(e.target.value)}
                />
                <div className="d-flex justify-content-center mt-2">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
            <div className="d-flex justify-content-center mt-2">
                <button className="btn btn-danger" type="submit" onClick={handleGoogleSignIn}>Sign In with Google account</button>
            </div>
        </div>
        </>
    )
}

export default Login