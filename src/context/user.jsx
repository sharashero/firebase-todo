import { useState, useContext, createContext, useEffect } from 'react';
import {
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../api/firebase';

const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(auth.currentUser);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        });

        return unsubscribe;
    }, []);


    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}


export function handleSignIn() {
    signInWithPopup(auth, new GoogleAuthProvider());
}

export function handleSignOut() {
    signOut(auth);
}
