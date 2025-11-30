import React, { useState } from "react";
import MyLink from "./MyLink";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);

  return (
    <nav className="bg-black text-gray-300 py-4 px-6 md:px-28 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide">
          One<span className="text-green-500">Society</span>
        </h1>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center gap-8 text-lg font-medium">
          <ul className="flex gap-8 items-center">
            <li>
              <MyLink to="/">Home</MyLink>
            </li>
            <li>
              <MyLink to="upcoming-events">Upcoming Events</MyLink>
            </li>
            <li>
              <MyLink to="articles">Articles</MyLink>
            </li>
            <li>
              <MyLink to="About-Us">About Us</MyLink>
            </li>

          </ul>


          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative group flex items-center">
                <MyLink to="/profile">
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-zinc-700 cursor-pointer"
                  />
                </MyLink>

                <span
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap px-2 py-1 bg-zinc-900 text-gray-200 text-sm rounded shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200">
                  {user.displayName || "User"}
                </span>
              </div>
            ) : (
              <MyLink
                to="/login"
                className="px-4 py-2 bg-green-600 hover:bg-red-700 rounded-md font-semibold text-sm"
              >
                Login
              </MyLink>
            )}

          </div>

          <li>
            <MyLink to="Register">Register</MyLink>
          </li>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-gray-200 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="text-2xl">
            {isOpen ? "✕" : "☰"}
          </span>
        </button>
      </div>


      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="mt-4 lg:hidden border-t border-zinc-800 pt-4">
          <ul className="flex flex-col gap-3 text-base font-medium">
            <li>
              <MyLink to="/" onClick={() => setIsOpen(false)}>
                Home
              </MyLink>
            </li>
            <li>
              <MyLink to="upcoming-events" onClick={() => setIsOpen(false)}>
                Upcoming Events
              </MyLink>
            </li>
            <li>
              <MyLink to="articles" onClick={() => setIsOpen(false)}>
                Articles
              </MyLink>
            </li>
            <li>
              <MyLink to="About-Us" onClick={() => setIsOpen(false)}>
                About Us
              </MyLink>
            </li>
            <li>
              <MyLink to="Register" onClick={() => setIsOpen(false)}>
                Register
              </MyLink>
            </li>
          </ul>

          <div className="mt-4 flex items-center">
            {user ? (
              <MyLink
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700"
              >
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-9 h-9 rounded-full border-2 border-zinc-700"
                />

              </MyLink>
            ) : (
              <MyLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-fit px-4 py-2 bg-green-600 hover:bg-red-700 rounded-md font-semibold text-sm mt-2"
              >
                Login
              </MyLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
