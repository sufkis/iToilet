import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../contexts/Auth';
import Login from '../components/login';
import Signup from '../components/signup';

const Welcome = () => {

    const { googleSignIn } = useAuth();
    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [loginMode, setLoginMode] = useState(false);
    const [signupMode, setSignupMode] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const handleGoogle = async (e) => {
        e.preventDefault();
        try {
            await googleSignIn();
            history.push('/main')
        } catch (err) {
            console.error(err);
        }

    }

    const handleLogin = () => {
        setLoginMode(true);
        onOpenModal();
    }

    const handleSignup = () => {
        setSignupMode(true)
        onOpenModal(); 
    }

    const handleCloseModal = () => {
        setLoginMode(false);
        setSignupMode(false);
        onCloseModal()
    }

    return (
        <>
        <div className="container w-50">
            <div className="display-4">iToilet<i className="fas fa-toilet m-4"></i></div>
            <div>
            <p className="text-info d-flex">Welcome to iToilet: When you gotta go - YOU GOTTA GO!</p>
            <p>Find your favorite toilet seat in the city to handle your private buissenss while supporting a local buissenss!</p>
            <p> Toilets are added by restaurnts or other providers and reviewd by the user.</p>
            </div>
            <div>
                <div className="d-flex flex-column justify-content-center">
                    <button onClick={handleLogin} className="btn btn-primary m-1">Login</button>
                </div>
                <div className="d-flex flex-column justify-content-center">
                <button onClick={handleSignup} className="btn btn-info  m-1">Signup</button>            
                </div>
                <div className="d-flex justify-content-center">
                    <p className="m-1">Or</p>
                </div>
                <div className="d-flex flex-column justify-content-center">
                    <button onClick={handleGoogle} className="btn btn-danger">Continue with Google</button>
                </div>
            </div>
        </div>
        <Modal open={open} onClose={handleCloseModal} center>
            {loginMode && <Login />}
            {signupMode && <Signup />}
        </Modal>
        </>
    )
}

export default Welcome