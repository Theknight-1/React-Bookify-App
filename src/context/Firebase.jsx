import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth'

const FirebaseContext = createContext(null);


const firebaseConfig = {
    apiKey: "AIzaSyBbyhH_AJj-A3yJ71_oiWOhV3Bck3uYvCI",
    authDomain: "bookify-83c40.firebaseapp.com",
    projectId: "bookify-83c40",
    storageBucket: "bookify-83c40.appspot.com",
    messagingSenderId: "733529421390",
    appId: "1:733529421390:web:28b1ae1ee16201c3a1751f"
  };

export const useFirebase = ()=> useContext(FirebaseContext);

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);


export const FirebaseProvider = (props) =>{
    const signupUserWithEmailAndPassword =(email,password)=>{
        createUserWithEmailAndPassword(firebaseAuth,email,password)
    }
    const signinUserWithEmailAndPassword = (email,password)=>{
        signInWithEmailAndPassword(firebaseAuth,email,password)
    }
    return (
        <FirebaseContext.Provider value={{signupUserWithEmailAndPassword, signinUserWithEmailAndPassword}}>
            {props.children}
        </FirebaseContext.Provider>
    )
}


