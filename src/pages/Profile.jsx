import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import Title from "../hooks/Title";
import Motion from "../components/Motion";

const Profile = () => {
  Title("Profile | OneSociety");

  const { user, updateProfileFunc, signoutUserFunc, loading } = useAuth();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [updating, setUpdating] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!displayName.trim()) {
      toast.error("Display name is required");
      return;
    }

    try {
      setUpdating(true);
      await updateProfileFunc(displayName, photoURL);
      toast.success("Profile updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  const handleSignout = async () => {
    try {
      await signoutUserFunc();
      toast.success("Signed out");
    } catch (err) {
      console.error(err);
      toast.error("Signout failed");
    }
  };

  // Navigation
  const goToCreateEvent = () => navigate("/create-event");
  const goToManageEvents = () => navigate("/manage-events");
  const goToJoinedEvents = () => navigate("/joined-events");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-gray-300">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-gray-300">You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black flex items-center justify-center px-4 py-10">
      <Motion>
        <div className="bg-zinc-900/90 backdrop-blur w-full max-w-2xl p-8 md:p-10 rounded-3xl shadow-2xl border border-zinc-800">

  
          <div className="mb-10">
            <h3 className="text-gray-300 uppercase tracking-wide text-sm mb-3">
              Event Dashboard
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={goToCreateEvent}
                className="w-full py-3 rounded-xl border border-green-500/50 
                           text-green-300 font-semibold text-sm hover:bg-green-600/30 hover:border-green-400 transition-all duration-200"
              >
                Create Event
              </button>

              <button
                onClick={goToManageEvents}
                className="w-full py-3 rounded-xl border border-green-500/50 
                           text-green-300 font-semibold text-sm hover:bg-green-600/30 hover:border-green-400 transition-all duration-200"
              >
                Manage Events
              </button>

              <button
                onClick={goToJoinedEvents}
                className="w-full py-3 rounded-xl border border-green-500/50 
                           text-green-300 font-semibold text-sm hover:bg-green-600/30 hover:border-green-400 transition-all duration-200"
              >
                Joined Events
              </button>
            </div>
          </div>


          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Your <span className="text-green-500">Profile</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              Manage your OneSociety identity and event activity.
            </p>
          </div>


          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6 border-b border-zinc-800 pb-6">
            <div className="flex items-center gap-4">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Avatar"
                  className="h-20 w-20 md:h-24 md:w-24 rounded-full object-cover border border-zinc-700 shadow-md"
                />
              ) : (
                <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-gray-500 text-2xl font-semibold">
                  {user.displayName?.[0]?.toUpperCase() || "U"}
                </div>
              )}
              <div>
                <p className="text-white font-semibold text-lg md:text-xl">
                  {user.displayName || "No name set"}
                </p>
                <p className="text-gray-400 text-sm">{user.email}</p>
                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-[11px] text-gray-300 uppercase tracking-wide">
                  Status: <span className="text-green-400">Active member</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-1 text-xs text-gray-400">
              <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700">
                Logged in via OneSociety
              </span>
            </div>
          </div>


          <div className="space-y-6">
            {/* Update profile form */}
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-200 tracking-wide uppercase">
                Profile Details
              </h3>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 text-gray-100 border border-zinc-700 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-sm"
                    placeholder="Enter your display name"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm mb-1">
                    Photo URL
                  </label>
                  <input
                    type="text"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 text-gray-100 border border-zinc-700 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-sm"
                    placeholder="Enter image URL"
                  />
                  <p className="text-[11px] text-gray-500 mt-1">
                    Use a direct image link (PNG/JPG).
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={updating}
                className="w-full mt-2 bg-green-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-semibold text-sm tracking-wide transition-all duration-300"
              >
                {updating ? "Updating..." : "Update Profile"}
              </button>
            </form>

     
            <div className="border-t border-zinc-800 pt-4">
              <button
                onClick={handleSignout}
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-2.5 rounded-lg font-semibold text-sm tracking-wide transition-all duration-300 border border-zinc-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </Motion>
    </div>
  );
};

export default Profile;
