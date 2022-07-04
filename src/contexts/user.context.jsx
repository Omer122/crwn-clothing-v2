import { createContext, useState, useEffect } from "react";

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

// the actucl value want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrenUser: ()=> null,
});

//wrap the app we want to deliver
export const UserProvider = ({ children }) =>{
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    //manually signout since getAuth listens and keeps data on the sign in users
    // signOutUser();

    //run this function once when the component mounts [], sign out= null callback
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user){
                //getting a valid userDocRef (new or existing) either way
                createUserDocumentFromAuth(user); 
            }
            setCurrentUser(user); //user signs out- stores null, signs in - stores the object
        })
        return unsubscribe;
    },[] );

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

//setting a cetralized placed to track all of the changes