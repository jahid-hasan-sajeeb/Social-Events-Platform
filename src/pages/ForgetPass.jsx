import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../firebase/firebase.config';
import { sendPasswordResetEmail } from 'firebase/auth';
import Title from '../hooks/Title';
import Motion from '../components/Motion';

const ForgetPass = () => {
    Title("Reset Password | OneSociety");

    const location = useLocation();
    const prefillEmail = location.state?.email || "";
    const [email, setEmail] = useState(prefillEmail);

    const handleResetPassword = (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success("Password reset email sent. Check your inbox.");
                window.open('https://mail.google.com/', '_blank');
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to send reset email. Try again.");
            });
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <Motion>
                <div className="bg-zinc-900 w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-800">
                    <h2 className="text-3xl font-bold text-center text-white mb-2">
                        Reset Password
                    </h2>
                    <p className="text-gray-400 text-center text-sm mb-6">
                        Enter your email and we'll send you a password reset link.
                    </p>

                    <form onSubmit={handleResetPassword} className="space-y-4">
                        <div>
                            <label className="block text-gray-300 text-sm mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 rounded-md bg-zinc-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-red-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-red-700 text-white py-2 rounded-md font-semibold transition-all duration-300"
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
            </Motion>
        </div>
    );
};

export default ForgetPass;
