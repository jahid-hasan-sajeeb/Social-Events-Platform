import React from 'react';

const Newsletter = () => {

    const handleSubscribe = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        console.log("Subscribed with:", email);
    };

    return (
        <section className="bg-zinc-900 border-t border-gray-800 px-4 py-30">
            <div className="max-w-3xl mx-auto text-center">
              
                <h2 className="text-3xl font-bold text-white mb-2">
                    Join the <span className="text-green-500">OneSociety</span> Newsletter
                </h2>
                <p className="text-gray-400 text-sm md:text-base mb-6">
                    Get updates on new releases, trending games, and exclusive tips. 
                    No spam, just good stuff.
                </p>

                <form
                    onSubmit={handleSubscribe}
                    className="flex flex-col sm:flex-row items-center gap-3 justify-center"
                >
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="Enter your email"
                        className="w-full sm:w-2/3 px-3 py-2 rounded-md bg-black text-gray-100 border border-gray-700 focus:outline-none focus:border-red-500 text-sm"
                    />
                    <button
                        type="submit"
                        className="w-full sm:w-auto bg-green-600 hover:bg-red-700 text-white font-semibold text-sm px-6 py-2 rounded-md transition-all duration-300"
                    >
                        Subscribe
                    </button>
                </form>

                <p className="text-gray-500 text-xs mt-3">
                    By subscribing, you agree to receive emails from OneSociety. 
                    You can unsubscribe anytime.
                </p>
            </div>
        </section>
    );
};

export default Newsletter;
