
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-hot-toast";

import Title from "../hooks/Title";
import Motion from "../components/Motion";
import { useAuth } from "../context/AuthContext";

const CreateEvent = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        eventType: "",
        thumbnail: "",
        location: "",
        eventDate: null,
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    Title("Create Event | OneSociety");

    const tomorrow = (() => {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        d.setHours(0, 0, 0, 0);
        return d;
    })();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const { title, description, eventType, thumbnail, location, eventDate } =
            formData;
        const newErrors = {};

        if (!title.trim()) newErrors.title = "Title is required.";
        if (!description.trim()) newErrors.description = "Description is required.";
        if (!eventType) newErrors.eventType = "Select an event type.";
        if (!thumbnail.trim()) newErrors.thumbnail = "Thumbnail URL is required.";
        if (!location.trim()) newErrors.location = "Location is required.";

        if (!eventDate) {
            newErrors.eventDate = "Select an event date.";
        } else {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (eventDate <= today) {
                newErrors.eventDate = "Event date must be a future date.";
            }
        }

        if (!user?.email) newErrors.user = "User not found. Please login again.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setSubmitting(true);

        const payload = {
            title: formData.title.trim(),
            description: formData.description.trim(),
            eventType: formData.eventType,
            thumbnail: formData.thumbnail.trim(),
            location: formData.location.trim(),
            eventDate: formData.eventDate.toISOString(),
            creatorEmail: user.email,
            joinedUsers: [],
        };

        try {
            const res = await fetch("https://a-10-back.vercel.app/events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                throw new Error("Failed to create event");
            }

            toast.success("Event created successfully 🎉");
            navigate("/upcoming-events");
        } catch (err) {
            toast.error(err.message || "Something went wrong.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white px-4 py-10">
            <Motion>
                <div className="max-w-3xl mx-auto bg-zinc-900 border border-gray-800 rounded-2xl p-6 md:p-8">
                    <h2 className="text-3xl font-bold text-center mb-2">
                        Create <span className="text-green-500">Event</span>
                    </h2>
                    <p className="text-gray-400 text-center mb-8">
                        Plan a social development event and invite others to take part.
                    </p>

                    {errors.user && (
                        <p className="text-red-500 text-sm text-center mb-4">
                            {errors.user}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Event Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-md bg-black text-gray-100 border border-gray-700 focus:outline-none focus:border-green-500 text-sm"
                                placeholder="e.g. Road Cleaning in Mirpur 10, Dhaka"
                                required
                            />
                            {errors.title && (
                                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Description
                            </label>
                            <textarea
                                name="description"
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-md bg-black text-gray-100 border border-gray-700 focus:outline-none focus:border-green-500 text-sm"
                                placeholder="Describe what will happen in this event."
                                required
                            />
                            {errors.description && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Event Type & Location */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Event Type
                                </label>
                                <select
                                    name="eventType"
                                    value={formData.eventType}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 rounded-md bg-black text-gray-100 border border-gray-700 focus:outline-none focus:border-green-500 text-sm"
                                    required
                                >
                                    <option value="">Select type</option>
                                    <option value="Cleanup">Cleanup</option>
                                    <option value="Plantation">Plantation</option>
                                    <option value="Donation">Donation</option>
                                    <option value="Awareness">Awareness</option>
                                    <option value="Others">Others</option>
                                </select>
                                {errors.eventType && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.eventType}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 rounded-md bg-black text-gray-100 border border-gray-700 focus:outline-none focus:border-green-500 text-sm"
                                    placeholder="e.g. Mirpur 10, Dhaka"
                                    required
                                />
                                {errors.location && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.location}
                                    </p>
                                )}
                            </div>
                        </div>

               
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Thumbnail Image URL
                                </label>
                                <input
                                    type="text"
                                    name="thumbnail"
                                    value={formData.thumbnail}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 rounded-md bg-black text-gray-100 border border-gray-700 focus:outline-none focus:border-green-500 text-sm"
                                    placeholder="Paste an image URL"
                                    required
                                />
                                {errors.thumbnail && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.thumbnail}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Event Date
                                </label>
                                <DatePicker
                                    selected={formData.eventDate}
                                    onChange={(date) =>
                                        setFormData((prev) => ({ ...prev, eventDate: date }))
                                    }
                                    minDate={tomorrow}
                                    dateFormat="dd MMM yyyy"
                                    className="w-full px-3 py-2 rounded-md bg-black text-gray-100 border border-gray-700 focus:outline-none focus:border-green-500 text-sm"
                                    placeholderText="Select a future date"
                                />
                                {errors.eventDate && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.eventDate}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Creator */}
                        <p className="text-xs text-gray-400">
                            Creating as:{" "}
                            <span className="text-green-400">
                                {user?.email || "Unknown user"}
                            </span>
                        </p>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full mt-4 bg-green-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm px-6 py-2 rounded-md transition-all duration-300"
                        >
                            {submitting ? "Creating..." : "Create Event"}
                        </button>
                    </form>
                </div>
            </Motion>
        </div>
    );
};

export default CreateEvent;
