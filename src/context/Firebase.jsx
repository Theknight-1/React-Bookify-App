import { createContext, useContext ,useState, useEffect} from "react";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from 'firebase/auth'
import {getFirestore, collection, addDoc, getDocs, doc, getDoc, query,  where} from "firebase/firestore"
import {getStorage , ref, uploadBytes, getDownloadURL} from "firebase/storage"

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
const auth = getAuth()

//GoogleProvider
const googleProvider = new GoogleAuthProvider()
//Firestore
const firestore = getFirestore(firebaseApp);
//Storage
const storage = getStorage(firebaseApp);

export const FirebaseProvider = (props) =>{

    //Function for Authentication
    const [user , setUser]= useState(null);

    useEffect(()=>{
        onAuthStateChanged(firebaseAuth, (user)=>{
            if(user) setUser(user)
            else setUser(null)
        })
    },[])
    const signupUserWithEmailAndPassword =(email,password)=>{
        createUserWithEmailAndPassword(firebaseAuth,email,password)
    }
    const signinUserWithEmailAndPassword = (email,password)=>{
        signInWithEmailAndPassword(firebaseAuth,email,password)
    }
    const signinWithGoogle = () =>{
        signInWithPopup(firebaseAuth, googleProvider)
    }
    const isLoggedIn = user ? true : false;
    
    //Function for Adding books(Firestor)
    const handleCreateNewListing = async(name, isbn,desc, price,cover)=>{
        const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`)
        const uploadResult  = await uploadBytes(imageRef, cover)
        try {
            return await addDoc(collection(firestore, 'books'),{
                name,
                isbn,
                desc,
                price,
                imageURL: uploadResult.ref.fullPath,
                userID:user.uid,
                userEmail:user.email,
                displayName: user.displayName,
                photoURL : user.photoURL
            });
        } catch (error) {
            throw new Error(error)   
        }
    }
    //Function to get Books
    const listAllBooks = () =>{
        return getDocs(collection(firestore, 'books'))
    }
    //Function to get books by ID
    const getBookByID =async (id)=>{
        const docRef = doc(firestore, "books", id);
        const result = await getDoc(docRef);
        return result;
    }
    const getImageURL = (path)=>{
        return getDownloadURL(ref(storage, path))
    };

    const placeOrder =async (bookID, qty)=>{
        const collectionRef = collection(firestore, 'books', bookID,'orders');
        const result = await addDoc(collectionRef,{
            userID:user.uid,
            userEmail:user.email,
            displayName: user.displayName,
            photoURL : user.photoURL,
            qty : Number(qty)
        });
        return result;
    }
    const giveFeedback =async (bookID, feedback)=>{
        const collectionRef = collection(firestore, 'books', bookID,'feedback');
        const result = await addDoc(collectionRef,{
            userID:user.uid,
            userEmail:user.email,
            displayName: user.displayName,
            photoURL : user.photoURL,
            feedback
        });
        return result;
    }
    const fetchMyBooks = async(userID) =>{
        const collectionRef = collection(firestore,'books');
        const q= query(collectionRef, where('userID', '==', userID));
        const result = await getDocs(q);
        return result
    }
    const getOrders = async(bookID)=>{
        const collectionRef = collection(firestore,'books',bookID,'orders');
        const result = getDocs(collectionRef);
        return result;
    }
    const signingOut = ()=>{
        signOut(auth).then(()=>{
            console.log("User signOut successfull");
        })
    }
    return (
        <FirebaseContext.Provider 
        value={{
            signupUserWithEmailAndPassword, 
            signinUserWithEmailAndPassword, 
            signinWithGoogle, 
            isLoggedIn,
            handleCreateNewListing,
            listAllBooks,
            getImageURL,
            getBookByID,
            placeOrder,
            giveFeedback,
            fetchMyBooks,
            user,
            getOrders,
            signingOut
        }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}


