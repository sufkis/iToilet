import React, { useContext, useState, useEffect } from 'react';
import { auth, provider } from '../firebase'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function googleSignIn() {
        return auth.signInWithPopup(provider);
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    useEffect(() => {
        let isMounted = true;
        const unsubscribe = auth.onAuthStateChanged(user => {
            console.log(user);
            isMounted && setCurrentUser(user);
            isMounted && setLoading(false);
        })

        return () => {
            isMounted = false;
            unsubscribe();
        }
    }, [])

    const context = {
        currentUser,
        signup,
        googleSignIn,
        login,
        logout,
    }

    return ( <
        AuthContext.Provider value = { context } > {!loading && children } <
        /AuthContext.Provider>
    )
}