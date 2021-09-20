import "./App.css";
import { useState, useRef, createContext } from "react";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { Groups } from "./components/Groups";
import { ChatRoom } from "./components/ChatRoom";
import { Nav } from "./components/Nav";

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

export const ModeContext = createContext({
  darkMode: false,
  setDarkMode: () => {},
});

let darkMode = "";
let textColor = "";
let inputColor = "";
// textColor: "rgb(230,230,230)",
// inputColor: "rgb(65,65,65)",
// const darkModeStyles = {
//   // eslint-disable-next-line no-undef
//   backgroundColor: "rgb(45,45,45)",
//   color: !darkMode && "rgb(230,230,230)",
// };

const darkModeStyles = {
  // eslint-disable-next-line no-undef
  backgroundColor: "rgb(45,45,45)",
  color: "rgb(230,230,230)",
  chatColor: "rgb(220,220,220)",
};

function App() {
  const [user] = useAuthState(auth);
  const [darkMode, setDarkMode] = useState(false);
  const value = { darkMode, setDarkMode, darkModeStyles };

  return (
    <ModeContext.Provider value={value}>
      <div className="App">
        <Nav />
        <section id="main-content">
          {user ? (
            <>
              <Groups firestore={firestore} />
              <ChatRoom auth={auth} firebase={firebase} firestore={firestore} />
            </>
          ) : (
            <SignIn />
          )}
        </section>
      </div>
    </ModeContext.Provider>
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
