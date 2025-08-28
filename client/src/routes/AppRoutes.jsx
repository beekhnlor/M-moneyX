import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 1. Import ProtectedRoute Component
import ProtectedRoute from "../components/ProtectedRoute";

// User layout
import LayoutUsers from "../Layout/LayoutUser";
// User pages
import Home from "../pagesUsers/Home";
import Service from "../pagesUsers/Service";
import Performance from "../pagesUsers/Performance";
import Message from "../pagesUsers/Message";
import Login from '../auth/Login';
import Register from '../auth/Register';
import About from "../pagesUsers/About";
import DownloadChannel from "../pagesUsers/DownloadChannel";
import UserChat from "../pagesUsers/UsersChat";

// Admin layout
import LayoutAdmin from '../Layout/LayoutAdmin';
// Admin pages
import AdminChat from '../admin/AdminChat';
import Manage from '../admin/Manage';
import LandingPage from "@/pagesUsers/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutUsers />,
    children: [
      // { index:true, element:<LandingPage/>},
      { index:true, element: <Home /> },
      { path: "service", element: <Service /> },
      { path: "performance", element: <Performance /> },
      { path: "message", element: <Message /> },
      { path: "about", element: <About /> },
      { path: "download", element: <DownloadChannel /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      
      { 
        path: "chat",
        element: (
          <ProtectedRoute>
            <UserChat />
          </ProtectedRoute>
        )
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <LayoutAdmin />
      </ProtectedRoute>
    ),
    children: [
 
      { index: true, element: <Manage /> },
      { path: "chat", element: <AdminChat /> },
      { path: "manage", element: <Manage /> }
    ]
  }
]);

const AppRoutes = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default AppRoutes;