import "./App.css";
import { useState, useRef } from "react";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { ChatRoom } from "./components/ChatRoom";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCdxW25ZtBwyy586n4aKGhlaA1cvydB9fw",
    authDomain: "chat-app-40824.firebaseapp.com",
    projectId: "chat-app-40824",
    storageBucket: "chat-app-40824.appspot.com",
    messagingSenderId: "206453519783",
    appId: "1:206453519783:web:e0107512c2dd83c18c7282",
    measurementId: "G-8T2B5SK4YE",
  });
} else {
  firebase.app(); // if already initialized, use that one
}

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header"></header>

      <section>{user ? <ChatRoom auth={auth} firebase={firebase} firestore={firestore} /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

function SignOut() {
  return auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>;
}

export default App;
