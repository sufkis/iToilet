import { useState } from "react"
import { useHistory } from "react-router";
import { useAuth } from "../contexts/Auth";


const Login = () => {

    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            history.push('/main')
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
                type="password"
                value={password}
                onChange={e=> setPassword(e.target.value)}
                />
                <div className="d-flex justify-content-center mt-2">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Login