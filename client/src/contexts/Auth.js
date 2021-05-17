import React, { useContext, useState, useEffect } from 'react';
import { auth, provider } from '../firebase'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

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


    function getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log("Sorry, Geolocation is not supported by this browser.");
        }
    }

    function showPosition(position) {

        let lat = position.coords.latitude
        let lng = position.coords.longitude
        setLat(lat);
        setLng(lng);
    }


    useEffect(() => {
        let isMounted = true;
        const unsubscribe = auth.onAuthStateChanged(user => {
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
        lat,
        lng,
        setLng,
        setLat,
        getPosition,
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