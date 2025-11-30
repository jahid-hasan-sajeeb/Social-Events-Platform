import React, { useEffect, useState } from "react";
import Title from "../hooks/Title";
import Motion from "../components/Motion";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const ManageEvents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // update event info
  const [editingEvent, setEditingEvent] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    eventType: "",
    location: "",
    thumbnail: "",
    eventDate: "",
  });
  const [updating, setUpdating] = useState(false);

  Title("Manage Events | OneSociety");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("https://a-10-back.vercel.app/events");
        const data = await res.json();

        const myEvents = data.filter(
          (event) => event.creatorEmail === user?.email
        );

        setEvents(myEvents);
      } catch (err) {
        toast.error(err.message || "Could not fetch events");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchEvents();
    } else {
      setLoading(false);
    }
  }, [user?.email]);

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this event?");
    if (!ok) return;

    try {
      const res = await fetch(`https://a-10-back.vercel.app/events/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setEvents((prev) => prev.filter((e) => e._id !== id));
      toast.success("Event deleted");
    } catch (err) {
      toast.error(err.message || "Could not delete event");
    }
  };


  const handleEditClick = (event) => {
    setEditingEvent(event);
    setEditForm({
      title: event.title || "",
      eventType: event.eventType || "",
      location: event.location || "",
      thumbnail: event.thumbnail || "",

      eventDate: event.eventDate
        ? new Date(event.eventDate).toISOString().slice(0, 10)
        : "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editingEvent) return;

    try {
      setUpdating(true);

      const payload = {
        ...editingEvent,
        title: editForm.title.trim(),
        eventType: editForm.eventType,
        location: editForm.location.trim(),
        thumbnail: editForm.thumbnail.trim(),
        eventDate: editForm.eventDate
          ? new Date(editForm.eventDate).toISOString()
          : editingEvent.eventDate,
      };

      const res = await fetch(
        `https://a-10-back.vercel.app/events/${editingEvent._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Update failed");
      }


      setEvents((prev) =>
        prev.map((ev) =>
          ev._id === editingEvent._id ? { ...ev, ...payload } : ev
        )
      );

      toast.success("Event updated successfully");
      setEditingEvent(null);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Could not update event");
    } finally {
      setUpdating(false);
    }
  };

  const closeEditModal = () => {
    if (updating) return;
    setEditingEvent(null);
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <Motion>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">
            Manage <span className="text-green-500">Events</span>
          </h2>
          <p className="text-gray-400 text-center mb-8">
            View and manage the events you’ve created.
          </p>

          {loading && (
            <p className="text-center text-gray-400">Loading your events...</p>
          )}

          {!loading && events.length === 0 && (
            <p className="text-center text-gray-500">
              You haven&apos;t created any events yet.
            </p>
          )}

          {!loading && events.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
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
                        <span className="text-gray-500 text-sm">No image</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold mb-1">
                    {event.title}
                  </h3>
                  <p className="text-xs text-gray-400 mb-1">
                    Type:{" "}
                    <span className="text-gray-200">{event.eventType}</span>
                  </p>
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

                  <div className="mt-auto flex gap-2">
                    <button
                      onClick={() => handleEditClick(event)}
                      className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-sm py-2 rounded-md"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-sm py-2 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

   
        {editingEvent && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-4 z-50">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">
                  Update <span className="text-green-500">Event</span>
                </h3>
                <button
                  onClick={closeEditModal}
                  className="text-gray-400 hover:text-gray-200 text-sm"
                  disabled={updating}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editForm.title}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 rounded-md bg-zinc-950 text-gray-100 border border-zinc-700 focus:outline-none focus:border-green-500 text-sm"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">
                      Event Type
                    </label>
                    <select
                      name="eventType"
                      value={editForm.eventType}
                      onChange={handleEditChange}
                      className="w-full px-3 py-2 rounded-md bg-zinc-950 text-gray-100 border border-zinc-700 focus:outline-none focus:border-green-500 text-sm"
                      required
                    >
                      <option value="">Select type</option>
                      <option value="Cleanup">Cleanup</option>
                      <option value="Plantation">Plantation</option>
                      <option value="Donation">Donation</option>
                      <option value="Awareness">Awareness</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      name="eventDate"
                      value={editForm.eventDate}
                      onChange={handleEditChange}
                      className="w-full px-3 py-2 rounded-md bg-zinc-950 text-gray-100 border border-zinc-700 focus:outline-none focus:border-green-500 text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={editForm.location}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 rounded-md bg-zinc-950 text-gray-100 border border-zinc-700 focus:outline-none focus:border-green-500 text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Thumbnail URL
                  </label>
                  <input
                    type="text"
                    name="thumbnail"
                    value={editForm.thumbnail}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 rounded-md bg-zinc-950 text-gray-100 border border-zinc-700 focus:outline-none focus:border-green-500 text-sm"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    disabled={updating}
                    className="px-4 py-2 rounded-md text-sm bg-zinc-800 hover:bg-zinc-700 border border-zinc-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updating}
                    className="px-4 py-2 rounded-md text-sm bg-green-600 hover:bg-red-700 text-white disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                  >
                    {updating ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Motion>
    </div>
  );
};

export default ManageEvents;
