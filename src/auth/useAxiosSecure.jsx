import axios from "axios";
import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../Firebase/firebase.congig";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
  baseURL: "https://blood-donation-server-liard.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        console.log(response);
        return response;
      },
      (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          window.location.href = "/auth/login";
          signOut(auth)
            .then(() => {
              // Sign-out successful.
              Swal.fire("SingOut!", "", "success");
              console.log(error.response);
            })
            .catch((error) => {
              // An error happened.
              console.log(error);
            });
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return axiosInstance;
};
export default useAxiosSecure;
