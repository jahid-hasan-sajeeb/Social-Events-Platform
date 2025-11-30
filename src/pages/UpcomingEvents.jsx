import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../hooks/Title";
import Motion from "../components/Motion";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [eventType, setEventType] = useState("All");
  const [search, setSearch] = useState("");

  Title("Upcoming Events | OneSociety");

  const fetchEvents = async ({ initial = false } = {}) => {
    try {
      if (initial) setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      params.append("upcoming", "true"); 

      if (eventType && eventType !== "All") {
        params.append("eventType", eventType);
      }

      if (search.trim()) {
        params.append("search", search.trim());
      }

      const res = await fetch(
        `http://localhost:3000/events?${params.toString()}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchEvents({ initial: true });
  }, []);

  const handleApplyFilters = (e) => {
    e.preventDefault();
    fetchEvents();
  };

  const handleClear = () => {
    setEventType("All");
    setSearch("");
    fetchEvents({ initial: true });
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <Motion>
        <div className="max-w-6xl mx-auto">
    
          <h2 className="text-3xl font-bold text-center mb-2">
            Upcoming <span className="text-green-500">Events</span>
          </h2>
          <p className="text-gray-400 text-center mb-8">
            Discover social development events happening around you.
          </p>

          <form
            onSubmit={handleApplyFilters}
            className="mb-8 flex flex-col md:flex-row gap-4 md:items-end"
          >

            <div className="flex-1">
              <label className="block text-sm text-gray-300 mb-1">
                Filter by event type
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-zinc-900 text-gray-100 border border-gray-700 focus:outline-none focus:border-green-500 text-sm"
              >
                <option value="All">All Types</option>
                <option value="Cleanup">Cleanup</option>
                <option value="Plantation">Plantation</option>
                <option value="Donation">Donation</option>
                <option value="Awareness">Awareness</option>
                <option value="Others">Others</option>
              </select>
            </div>


            <div className="flex-[2]">
              <label className="block text-sm text-gray-300 mb-1">
                Search by event name
              </label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="e.g. River Cleanup in Banani"
                className="w-full px-3 py-2 rounded-md bg-zinc-900 text-gray-100 border border-gray-700 focus:outline-none focus:border-green-500 text-sm"
              />
            </div>


            <div className="flex gap-2 md:w-auto">
              <button
                type="submit"
                className="w-full md:w-auto px-4 py-2 rounded-md bg-green-600 hover:bg-red-700 text-sm font-semibold transition-all duration-300"
              >
                Apply
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="w-full md:w-auto px-4 py-2 rounded-md bg-zinc-900 border border-gray-700 hover:bg-zinc-800 text-sm font-semibold transition-all duration-300"
              >
                Clear
              </button>
            </div>
          </form>

          {loading && (
            <p className="text-center text-gray-400">Loading events...</p>
          )}

          {error && (
            <p className="text-center text-red-500 mb-4">{error}</p>
          )}

          {!loading && !error && events.length === 0 && (
            <p className="text-center text-gray-500">
              No upcoming events found. Try changing filters or search.
            </p>
          )}

 
          {!loading && !error && events.length > 0 && (
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
