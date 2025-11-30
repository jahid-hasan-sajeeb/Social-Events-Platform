
import React, { useEffect, useState } from "react";
import Title from "../hooks/Title";
import Motion from "../components/Motion";
import { useAuth } from "../context/AuthContext";

const JoinedEvents = () => {
  const { user } = useAuth();
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  Title("Joined Events | OneSociety");

  useEffect(() => {
    const fetchJoined = async () => {
      try {
        const res = await fetch("http://localhost:3000/events");
        const data = await res.json();

        const mine = data.filter((event) =>
          Array.isArray(event.joinedUsers)
            ? event.joinedUsers.includes(user?.email)
            : false
        );

        // sorting by event Date in ascending order
        mine.sort(
          (a, b) =>
            new Date(a.eventDate || 0) - new Date(b.eventDate || 0)
        );

        setJoinedEvents(mine);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchJoined();
    } else {
      setLoading(false);
    }
  }, [user?.email]);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <Motion>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">
            Joined <span className="text-green-500">Events</span>
          </h2>
          <p className="text-gray-400 text-center mb-8">
            Events you have decided to be a part of.
          </p>

          {loading && (
            <p className="text-center text-gray-400">
              Loading your joined events...
            </p>
          )}

          {!loading && joinedEvents.length === 0 && (
            <p className="text-center text-gray-500">
              You haven&apos;t joined any events yet.
            </p>
          )}

          {!loading && joinedEvents.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {joinedEvents.map((event) => (
                <div
                  key={event._id}
                  className="bg-zinc-900 border border-gray-800 rounded-2xl p-4 flex flex-col shadow-md"
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

                  <h3 className="text-lg font-semibold mb-1">
                    {event.title}
                  </h3>
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

                  <p className="text-xs text-gray-500">
                    Joined as:{" "}
                    <span className="text-gray-300">
                      {user?.email}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Motion>
    </div>
  );
};

export default JoinedEvents;
