import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyChaaYw8QPIqRDvZzIgJtfJ6e3TQ4_ajEs",
  authDomain: "projektntip.firebaseapp.com",
  projectId: "projektntip",
  storageBucket: "projektntip.appspot.com",
  messagingSenderId: "544247531592",
  appId: "1:544247531592:web:971476e27f7fde4f8bf07d"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore (app);

const signup = async (name,email, password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}

const login = async (email,password)=>{
    try{
        await signInWithEmailAndPassword(auth, email, password);
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout= ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};