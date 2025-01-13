import React, { useContext, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import Google from "../components/Google";

const LogIn = () => {
  const { dark, logInMail, setUser, user} = useContext(AuthContext);
  const location = useLocation();
  // console.log(location.state)
  const [formData, setFormData] = useState({
    mail: "",
    password: "",
    remember: false,
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form Data:", formData);
    logInMail(formData.mail, formData.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        Swal.fire("LogIn successed", "", "success");
        navigate(location.state ? location.state : '/');
        // ...
      })
      .catch((error) => {
       
        Swal.fire("Mail or password is wrong", "", "info");

      });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div
          className={`relative ${
            dark ? "border border-yellow-300" : "bg-white"
          } p-8 rounded-lg shadow-md  max-w-md w-full`}
        >
          {/* Lock Icon */}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2"></div>
          <h2
            className={`text-center text-xl font-bold mb-6 ${
              dark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            USER LOGIN
          </h2>
          <form onSubmit={handleSubmit}>
            {/* mail Field */}
            <div className="mb-4">
              <input
                type="text"
                name="mail"
                placeholder="mail"
                className="input input-bordered w-full"
                value={formData.mail}
                required
                onChange={handleChange}
              />
            </div>
            {/* Password Field */}
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
            {/* Remember Me and Forgot Password */}
            <div className="flex justify-between items-center mb-6">
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  name="remember"
                  className="checkbox checkbox-primary"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                <span>Remember Me</span>
              </label>
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot Password?
              </a>
            </div>
            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full">
              LOGIN
            </button>
          </form>
          {/* Register Section */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to={`/auth/register`}
                className="text-blue-500 hover:underline font-semibold"
              >
                Register
              </Link>
            </p>
          </div>
          
            <Google></Google>
        </div>
      </div>
    </>
  );
};

export default LogIn;
