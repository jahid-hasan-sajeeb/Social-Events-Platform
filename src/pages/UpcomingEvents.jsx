import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import Title from "../hooks/Title";
import Motion from "../components/Motion";

const UpcomingEvents = () => {

  const events = useLoaderData() || [];

  Title("Upcoming Events | OneSociety");

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <Motion>
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <h2 className="text-3xl font-bold text-center mb-2">
            Upcoming <span className="text-green-500">Events</span>
          </h2>
          <p className="text-gray-400 text-center mb-8">
            Discover social development events happening around you.
          </p>

          {events.length === 0 && (
            <p className="text-center text-gray-500">
              No upcoming events right now.
            </p>
          )}

          {events.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event._id || event.id}
                  className="bg-zinc-900 border border-gray-800 rounded-2xl p-4 flex flex-col shadow-md hover:border-green-600 transition-all"
                >

                  <div className="w-full h-40 bg-zinc-800 rounded-xl mb-4 overflow-hidden">
                    {event.thumbnail ? (
                      <img
                        src={event.thumbnail}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-500 text-sm">
                          No image
                        </span>
                      </div>
                    )}
                  </div>


                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-semibold">
                      {event.title}
                    </h3>
                    {event.eventType && (
                      <span className="px-2 py-1 rounded-full text-[10px] uppercase tracking-wide bg-green-700/20 text-green-400 border border-green-700/40">
                        {event.eventType}
                      </span>
                    )}
                  </div>


                  <p className="text-xs text-gray-400 mb-1">
                    Date:{" "}
                    <span className="text-gray-200">
                      {event.eventDate
                        ? new Date(event.eventDate).toLocaleDateString()
                        : "Not set"}
                    </span>
                  </p>
                  <p className="text-xs text-gray-400 mb-3">
                    Location:{" "}
                    <span className="text-gray-200">
                      {event.location || "Not set"}
                    </span>
                  </p>

                  {/* Description */}
                  {event.description && (
                    <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                      {event.description}
                    </p>
                  )}

                  <Link
                    to={`/events/${event._id || event.id}`}
                    className="mt-auto inline-block text-center bg-green-600 hover:bg-red-700 text-white py-2 rounded-md text-sm font-semibold transition-all duration-300"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </Motion>
    </div>
  );
};

export default UpcomingEvents;
