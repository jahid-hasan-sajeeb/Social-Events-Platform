import React from 'react';
import { NavLink } from 'react-router-dom';

const MyLink = ({ to, children }) => {
    return (
        <NavLink
              to={to}
              className={({ isActive }) =>
                isActive ? "text-green-500 font-bold" : "hover:text-green-500 transition-all duration-300"
              }
            >
              {children}
            </NavLink>
    );
};

export default MyLink;