import React, { useState } from "react";
import { useLoaderData, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Title from "../hooks/Title";
import Motion from "../components/Motion";
import { useAuth } from "../context/AuthContext";

const SingleEventDetails = () => {
  const loadedEvent = useLoaderData();
  const [event, setEvent] = useState(loadedEvent);
  const [joining, setJoining] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  Title(`Event Details | ${event?.title || "OneSociety"}`);

  if (!event) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <p className="text-gray-400">Event not found.</p>
      </div>
    );
  }

  const isAlreadyJoined =
    user &&
    Array.isArray(event.joinedUsers) &&
    event.joinedUsers.includes(user.email);

  const handleJoin = async () => {
    if (!user) {
      toast.error("You must be logged in to join this event.");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (isAlreadyJoined) {
      toast.info("You have already joined this event.");
      return;
    }

    try {
      setJoining(true);
      const res = await fetch(
        `https://a-10-back.vercel.app/events/${event._id}/join`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userEmail: user.email }),
        }
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Failed to join event");
      }

      toast.success("You successfully joined this event 🎉");

  
      setEvent((prev) => ({
        ...prev,
        joinedUsers: Array.isArray(prev.joinedUsers)
          ? [...prev.joinedUsers, user.email]
          : [user.email],
      }));
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong.");
    } finally {
      setJoining(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <Motion>
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Event <span className="text-green-500">Details</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              Learn more about this social event and join if it inspires you.
            </p>
          </div>

          {/* Card */}
          <div className="bg-zinc-900 border border-gray-800 rounded-2xl p-5 md:p-7 shadow-xl">
            {/* Image */}
            <div className="w-full h-56 md:h-96 bg-zinc-800 rounded-xl mb-5 overflow-hidden">
              {event.thumbnail ? (
                <img
                  src={event.thumbnail}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-500 text-sm">
                    No image available
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <h3 className="text-2xl font-semibold">{event.title}</h3>
              {event.eventType && (
                <span className="self-start md:self-auto px-3 py-1 rounded-full text-xs uppercase tracking-wide bg-green-700/20 text-green-400 border border-green-700/40">
                  {event.eventType}
                </span>
              )}
            </div>

    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-5">
              <p className="text-gray-400">
                <span className="text-gray-500">Date:</span>{" "}
                <span className="text-gray-100">
                  {event.eventDate
                    ? new Date(event.eventDate).toLocaleString()
                    : "Not specified"}
                </span>
              </p>
              <p className="text-gray-400">
                <span className="text-gray-500">Location:</span>{" "}
                <span className="text-gray-100">
                  {event.location || "Not specified"}
                </span>
              </p>
              <p className="text-gray-400">
                <span className="text-gray-500">Created by:</span>{" "}
                <span className="text-gray-100">
                  {event.creatorEmail || "Unknown"}
                </span>
              </p>
              <p className="text-gray-400">
                <span className="text-gray-500">Joined users:</span>{" "}
                <span className="text-gray-100">
                  {Array.isArray(event.joinedUsers)
                    ? event.joinedUsers.length
                    : 0}
                </span>
              </p>
            </div>

            {/* Description */}
            {event.description && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">
                  About this event
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {event.description}
                </p>
              </div>
            )}

            {/* Join button */}
            <div className="flex justify-end">
              <button
                onClick={handleJoin}
                disabled={joining || isAlreadyJoined}
                className="bg-green-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm px-6 py-2 rounded-md transition-all duration-300"
              >
                {isAlreadyJoined
                  ? "Already Joined"
                  : joining
                  ? "Joining..."
                  : "Join Event"}
              </button>
            </div>
          </div>
        </div>
      </Motion>
    </div>
  );
};

export default SingleEventDetails;
