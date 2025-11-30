import React from 'react';
import { Link } from 'react-router-dom';
import Title from '../hooks/Title';

const Error = () => {

    Title("Error | OneSociety")

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
            <p className="text-gray-300 text-lg mb-6">
                Page not found. Give a valid address!
            </p>

            <Link
                to="/"
                className="bg-green-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-semibold transition-all duration-300"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default Error;
