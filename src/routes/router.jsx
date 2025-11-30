import React from 'react';
import { createBrowserRouter } from 'react-router';
import HomeLayout from '../layouts/HomeLayout';
import Home from '../pages/Home';
import AboutUs from '../pages/AboutUs';
import Register from '../pages/Register';
import Login from '../pages/Login'
import Error from '../pages/Error';
import UpcomingEvents from '../pages/UpcomingEvents';
import Articles from '../pages/Articles';
import PrivateRoute from '../privateRoute/PrivateRoute';
import ForgetPass from '../pages/ForgetPass';
import Profile from '../pages/Profile';
import CreateEvent from '../pages/CreateEvent';
import ManageEvents from '../pages/ManageEvents';
import JoinedEvents from '../pages/JoinedEvents';
import SingleEventDetails from '../pages/SingleEventDetails';


const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: "/home",
                element: <Home></Home>
            },
            {
                path: "forget-password",
                element: <ForgetPass></ForgetPass>
            },
            {
                path: "/profile",
                element: <PrivateRoute>
                    <Profile></Profile>
                </PrivateRoute>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/about-us",
                element: <AboutUs></AboutUs>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "*",
                element: <Error></Error>
            },
            {
                path: "upcoming-events",
                element: <UpcomingEvents></UpcomingEvents>
            },
            {
                path: "articles",
                element: <Articles></Articles>
            },
            {
                path: "create-event",
                element: (
                    <PrivateRoute>
                        <CreateEvent />
                    </PrivateRoute>
                )
            },
            {
                path: "manage-events",
                element: (
                    <PrivateRoute>
                        <ManageEvents />
                    </PrivateRoute>
                )
            },
            {
                path: "joined-events",
                element: (
                    <PrivateRoute>
                        <JoinedEvents />
                    </PrivateRoute>
                )
            },
            {
                path: "events/:id",
                element: <SingleEventDetails />,
                loader: ({ params }) =>
                    fetch(`https://a-10-back.vercel.app/events/${params.id}`)
            },
        ]
    }
]
)

export default router;