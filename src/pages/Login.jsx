import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Title from "../hooks/Title";
import Motion from "../components/Motion";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  Title("Login | OneSociety");

  const [show, setShow] = useState(false);
  const [typedEmail, setTypedEmail] = useState("");


  const {
    user,
    loading,
    signInWithEmailAndPasswordFunc,
    signInWithGoogleFunc,
    signoutUserFunc,
  } = useAuth();

  const firebaseErrorMessages = {
    "auth/invalid-email": "That email doesn’t look right.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password. Try again.",
    "auth/missing-password": "Please enter your password.",
    "auth/too-many-requests": "Too many attempts. Take a break.",
    "auth/network-request-failed": "Network issue. Check your connection.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/invalid-credential": "Your email or password is incorrect.",
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    signInWithEmailAndPasswordFunc(email, password)
      .then(() => {
        toast.success("Login Successful");
      })
      .catch((error) => {
        const errorMessage =
          firebaseErrorMessages[error.code] || "Login failed. Try again.";
        toast.error(errorMessage);
      });
  };

  const handleLoginByGoogle = () => {
    signInWithGoogleFunc()
      .then(() => {
        toast.success("Login Successful");
      })
      .catch((error) => {
        const errorMessage =
          firebaseErrorMessages[error.code] ||
          error.message ||
          "Google login failed.";
        toast.error(errorMessage);
      });
  };

  const handleSignout = () => {
    signoutUserFunc()
      .then(() => {
        toast.success("Signout successful");
      })
      .catch(() => {
        toast.error("Signout failed.");
      });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <Motion>
        <div className="bg-zinc-900 w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-800">
      
          <h2 className="text-3xl font-bold text-center text-white mb-2">
            Welcome Back to <span className="text-green-500">OneSociety</span>
          </h2>
          <p className="text-gray-400 text-center text-sm mb-6">
            Explore your favorite games
          </p>

          {/* Loading state  */}
          {loading && !user && (
            <p className="text-center text-gray-400 mb-4">...</p>
          )}

          {user ? (
            <div className="text-center space-y-3">
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  className="h-20 w-20 rounded-full mx-auto"
                  alt="User avatar"
                />
              )}

              <h2 className="text-xl font-semibold text-white">
                {user.displayName || "User"}
              </h2>

              <p className="text-white">{user.email}</p>

              <button
                className="px-4 py-2 bg-red-500 rounded-md text-white mt-2"
                onClick={handleSignout}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              {/* Login form */}
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-gray-300 text-sm mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 rounded-md bg-zinc-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-red-500"
                    required
                    value={typedEmail}
                    onChange={(e) => setTypedEmail(e.target.value)}
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <label className="block text-gray-300 text-sm mb-1">
                    Password
                  </label>
                  <input
                    type={show ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className="w-full px-3 py-2 rounded-md bg-zinc-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-red-500"
                    required
                  />
                  <span
                    onClick={() => setShow(!show)}
                    className="text-white absolute right-2 top-9 cursor-pointer"
                  >
                    {show ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-red-700 text-white py-2 rounded-md font-semibold transition-all duration-300"
                >
                  Login
                </button>
              </form>

              {/* or */}
              <div className="flex items-center justify-center my-4">
                <hr className="h-px w-26 border-gray-700" />
                <span className="px-2 text-gray-500 text-sm">or</span>
                <hr className="h-px w-26 border-gray-700" />
              </div>

              {/* Forgot password link */}
              <div className="flex justify-center mb-3">
                <Link
                  to="/forget-password"
                  state={{email: typedEmail}}
                  className="text-sm text-green-500 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Google login */}
              <button
                onClick={handleLoginByGoogle}
                className="w-full bg-white text-gray-800 py-2 rounded-md font-semibold hover:bg-gray-100 transition-all duration-300 flex justify-center items-center gap-2"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>

              {/* Register Redirection */}
              <p className="text-gray-400 text-sm text-center mt-6">
                New to OneSociety?{" "}
                <Link to="/register" className="text-green-500 hover:underline">
                  Create an account
                </Link>
              </p>
            </>
          )}
        </div>
      </Motion>
    </div>
  );
};

export default Login;
