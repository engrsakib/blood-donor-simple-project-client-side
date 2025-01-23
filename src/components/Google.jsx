import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Swal from "sweetalert2";

const Google = () => {
  const { setUser, setLoadding, user } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleGoogleLogin = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const users = result.user;

        const name = users?.displayName;
        const photo = users?.photoURL;
        const mail = users?.email;

        const newUser = {
          name,
          mail,
          photo,
          crateDate: users?.metadata?.creationTime,
          lastSignInDate: users?.metadata?.lastSignInTime,
        };

        if (!user || user.mail !== users.email) {
          fetch("https://blood-donation-server-liard.vercel.app/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(newUser),
          })
            .then((res) => res.json())
            .then((data) => {
              setLoadding(true);
              setUser(newUser);
              Swal.fire("User LogIn success", "", "success");
              setLoadding(false);
              navigate("/");
            })
            .catch((error) => {
              console.error("Error saving user:", error);
              Swal.fire("Failed to save user data.");
            });
        }
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error);
        Swal.fire("Something went wrong during login!");
      });
  };
  return (
    <div className="flex justify-center mt-4">
      <div
        className="btn bg-red-300 hover:bg-red-500 text-white flex items-center gap-2 px-4 py-2 rounded-lg"
        onClick={handleGoogleLogin}
      >
        <FcGoogle className="text-xl" /> {/* Google icon */}
        Login with Google
      </div>
    </div>
  );
};

export default Google;
