import React from "react";
import { FaHandsHelping, FaLeaf, FaUsers, FaCalendarCheck } from "react-icons/fa";

const Features = () => {
    const items = [
        {
            icon: <FaCalendarCheck className="text-green-500 text-3xl" />,
            title: "Create & Track Events",
            desc: "Organize community actions effortlessly and keep everything structured."
        },
        {
            icon: <FaUsers className="text-green-500 text-3xl" />,
            title: "Join Social Initiatives",
            desc: "Be part of meaningful work happening right around you."
        },
        {
            icon: <FaHandsHelping className="text-green-500 text-3xl" />,
            title: "Verified Participation",
            desc: "Each event entry reflects real involvement, building trust."
        },
        {
            icon: <FaLeaf className="text-green-500 text-3xl" />,
            title: "Event Categories",
            desc: "Cleanup, plantation, donation drives — browse events by type."
        },
    ];

    return (
        <section className="bg-zinc-900 border-t border-gray-800 px-4 py-24">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-3">
                    Platform <span className="text-green-500">Features</span>
                </h2>
                <p className="text-gray-400 text-sm md:text-base mb-10">
                    A space where community-driven work gets organized, seen, and supported.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-black/40 border border-gray-800 p-6 rounded-xl hover:border-green-600 transition-all"
                        >
                            <div className="mb-3 flex justify-center">{item.icon}</div>
                            <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>
                            <p className="text-gray-400 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
