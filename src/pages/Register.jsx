import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../firebase/firebase.config';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import Title from '../hooks/Title';
import Motion from '../components/Motion';

const Register = () => {
    Title("Register | OneSociety")
    const [show, setShow] = useState(false);

    const handleSignUp = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log({email, password})

        if(password.length < 6){
            toast.error("Password must be at least 6 characters long");
            return;
        }

        const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        if(!regExp.test(password)){
            toast.error("Password must contain at least one uppercase letter, one lowercase letter, and one number.");
            return;
        }


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

        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log(res)
                toast.success("Signup Successful")
            })
            .catch((error) => {
                const errorMessage = firebaseErrorMessages[error.code];
                toast.error(errorMessage)
            });
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <Motion>

                <div className="bg-zinc-900 w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-800">

                {/* Title */}
                <h2 className="text-3xl font-bold text-center text-white mb-2">
                    Create Your <span className="text-green-500">OneSociety</span> Account
                </h2>
                <p className="text-gray-400 text-center text-sm mb-6">
                    Join the community and start exploring the latest games
                </p>

                {/* Form */}
                <form onSubmit={handleSignUp} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-gray-300 text-sm mb-1">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full px-3 py-2 rounded-md bg-zinc-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-red-500"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-300 text-sm mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 rounded-md bg-zinc-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-red-500"
                            required
                        />
                    </div>

                    {/* Photo URL */}
                    <div>
                        <label className="block text-gray-300 text-sm mb-1">Photo URL</label>
                        <input
                            type="url"
                            placeholder="Enter your profile photo link"
                            className="w-full px-3 py-2 rounded-md bg-zinc-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-red-500 required:"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="block text-gray-300 text-sm mb-1">Password</label>
                        <input
                            type={show ? "text" : "password"}
                            name="password"
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 rounded-md bg-zinc-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-red-500"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Must contain an uppercase, lowercase, and be at least 6 characters long.
                        </p>
                        <span onClick={()=>setShow(!show)} className='text-white absolute right-2 top-10'>
                            {show ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-red-700 text-white py-2 rounded-md font-semibold transition-all duration-300"
                    >
                        Register
                    </button>
                </form>

                {/* or */}
                <div className="flex items-center justify-center my-4">
                    <hr className="h-px w-26 border-gray-700" />
                    <span className="px-2 text-gray-500 text-sm">or</span>
                    <hr className="h-px w-26 border-gray-700" />
                </div>

                {/* Login Redirection */}
                <p className="text-gray-400 text-base text-center mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-green-500 hover:underline">
                        Login here
                    </Link>
                </p>
                </div>
                
            </Motion>
        </div>
    );
};

export default Register;
