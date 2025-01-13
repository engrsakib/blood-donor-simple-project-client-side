import React, { useContext, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import Google from "../components/Google";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const { crateMailPassword, user, setUser, loadding, setLoadding, dark } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    photoUrl: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePassword(formData.password)) {
      setPasswordError(
        "Password must be at least 6 characters long, one uppercase and one lower case"
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setPasswordError("");
    // console.log("Form Submitted:", formData);
    const mail = formData.email.toLowerCase();
    const password = formData.password;

    crateMailPassword(mail, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // console.log(user);

        // save info to the dataBase
        const name = formData.name;
        const photo = formData.photoUrl;
        // console.log(name)
        const newUser = {
          name,
          mail,
          photo,
          crateDate: user?.metadata?.creationTime,
          lastSignInDate: user?.metadata?.lastSignInTime,
        };

        fetch("https://lostserver.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(newUser);
            setLoadding(true);
            setUser(newUser);
            Swal.fire("user create success", "", "success");
            setLoadding(false);
            navigate("/");
          });
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // console.log(errorCode, errorMessage);
        Swal.fire("Your mail is aleady exist", "", "info");
        // ..
      });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div
          className={`${
            dark ? "border border-yellow-300" : "bg-white"
          } p-8 rounded-lg shadow-md max-w-md w-full`}
        >
          <h2
            className={`text-center text-xl font-bold mb-6 ${
              dark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Register
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="input input-bordered w-full"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="input input-bordered w-full"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            {/* Photo URL */}
            <div className="mb-4">
              <input
                type="url"
                name="photoUrl"
                placeholder="Photo URL"
                className="input input-bordered w-full"
                value={formData.photoUrl}
                onChange={handleChange}
              />
            </div>
            {/* Password */}
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="input input-bordered w-full"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </div>
            </div>
            {/* Confirm Password */}
            <div className="mb-4">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="input input-bordered w-full"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            {/* Password Error */}
            {passwordError && (
              <p className="text-red-500 text-sm mb-4">{passwordError}</p>
            )}
            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full">
              Register
            </button>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                already have an account?{" "}
                <Link
                  to={`/auth/login`}
                  className="text-blue-500 hover:underline font-semibold"
                >
                  LogIn
                </Link>
              </p>
            </div>
          </form>
          <Google></Google>
        </div>
      </div>
    </>
  );
};

export default Register;
