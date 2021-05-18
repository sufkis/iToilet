import React, { useContext, useState, useEffect } from 'react';
import { auth, provider } from '../firebase'
import localForage from 'localforage'
import { useHistory } from 'react-router';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [coords, setCoords] = useState({ lat: 0, lng: 0 })
    const history = useHistory();

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function googleSignIn() {
        auth.signInWithPopup(provider);
        history.push('/')
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    async function logout() {
        setCoords({ lat: 0, lng: 0 })
        await localForage.removeItem(coords)
        return auth.signOut();
    }


    function getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log("Sorry, Geolocation is not supported by this browser.");
        }
    }

    async function showPosition(position) {

        let lat = position.coords.latitude
        let lng = position.coords.longitude
        try {
            await handleOnPosition(lat, lng)
        } catch (err) {
            console.error(err)
        }
    }

    async function handleOnPosition(lat, lng) {
        console.log(lat, lng)
        setCoords({ lat, lng })
        console.log(coords);
        await localForage.setItem('coords', coords)
    }



    useEffect(() => {
        let isMounted = true;
        const unsubscribe = auth.onAuthStateChanged(user => {
            isMounted && setCurrentUser(user);
            isMounted && setLoading(false);
            localForage.getItem('coords')
                .then(userCoords => {
                    if (userCoords) {
                        console.log(userCoords)
                        setCoords(userCoords)
                    }
                })
        })
        return () => {
            isMounted = false;
            unsubscribe();
        }
    }, [])


    const context = {
        currentUser,
        coords,
        handleOnPosition,
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