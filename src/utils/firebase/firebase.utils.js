import { initializeApp } from 'firebase/app';
import { getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword
    } from 'firebase/auth';

import { 
    getFirestore,
    doc,
    getDoc,
    setDoc
    } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBnq7IczA1YVmcNPJUz1-QxbqxHSSHnq1s",
    authDomain: "crwn-clothing-db-ec2d0.firebaseapp.com",
    projectId: "crwn-clothing-db-ec2d0",
    storageBucket: "crwn-clothing-db-ec2d0.appspot.com",
    messagingSenderId: "317930400616",
    appId: "1:317930400616:web:8856e083b185c7680d04dd"
  };

  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = ()=> 
    signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => 
    signInWithRedirect(auth, googleProvider );

export const db = getFirestore();

//create users
export const createUserDocumentFromAuth = async (
    userAuth, 
    additionInfo = {}
    )=>{
        if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid );
    
    // get data related to the doc
    const userSnapshot = await getDoc(userDocRef);

    // if user data does not exist in firestore:
    // create/set the document with the data from userAuth in my collection
    if (!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date(); //when was the sign-in
    
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionInfo
            });
        } catch (error){
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
};

//authenticatd user, setting values async in firebase
export const createAuthUserWithEmailAndPassword = async (email, password ) =>{
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);

}