import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.congig";
import Loading from "../components/Loading";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  //theme control
  // Initialize dark mode state with data from localStorage
  const [dark, setdark] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // active donation
  const [active, setActive] = useState(true);

  // Update the theme whenever `dark` changes
  useEffect(() => {
    const theme = dark ? "forest" : "light";
    document.getElementsByTagName("html")[0].setAttribute("data-theme", theme);

    // Save the preference to localStorage
    localStorage.setItem("darkMode", JSON.stringify(dark));
  }, [dark]);

  // user setup
  const [user, setUser] = useState(null);
  const [loadding, setLoadding] = useState(true);
  // console.log(user?.email);

  const provider = new GoogleAuthProvider();

  // observerd
  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (Currentuser) => {
      setUser(Currentuser);
      setTimeout(() => {
        setLoadding(false);
      }, 1000);

      if (Currentuser?.email) {
        const user = { email: Currentuser.email };

        axios
          .post("https://lostserver.vercel.app/jwt", user, {
            withCredentials: true,
          })
          .then((data) => {
            console.log(data.data);
          });
      }
      if (Currentuser?.email) {
        fetch(`https://lostserver.vercel.app/users/${Currentuser?.email}`)
          .then((res) => res.json())
          .then((data) => setUser(data[0]));
      } else {
        axios
          .post(
            "https://lostserver.vercel.app/logout",
            {},
            {
              withCredentials: true,
            }
          )
          .then((res) => console.log(res.data));
      }
    });

    return () => {
      subscribe();
    };
  }, []);

  // console.log(user);
  // loading
  if (loadding) {
    return <Loading></Loading>;
  }

  // singin popup

  //Register by email and password
  const crateMailPassword = (mail, password) => {
    return createUserWithEmailAndPassword(auth, mail, password);
  };

  // logIn mail and password
  const logInMail = (mail, password) => {
    return signInWithEmailAndPassword(auth, mail, password);
  };

  const authInfo = {
    setdark,
    dark,
    setUser,
    user,
    logInMail,
    crateMailPassword,
    loadding,
    setLoadding,
    setActive,
    active,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
