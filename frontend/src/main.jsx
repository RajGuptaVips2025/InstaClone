import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PostSection from './components/Home/PostSection.jsx';
import Register from './components/UserLogin/Register.jsx';
import Login from './components/UserLogin/Login.jsx';
import Layout from './components/Layout/Layout.jsx';
import Profile from './components/Profile/Profile.jsx';
import PostViewer from './components/Profile/PostViewer.jsx';
import EditProfile from './components/Profile/EditProfile.jsx';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './app/store'; // Import both store and persistor
import Explore from './components/SidebarComponents/Explore.jsx';
import Reels from './components/SidebarComponents/Reels.jsx';
import ChatPage from './components/Chat/ChatPage.jsx';
import { io } from "socket.io-client"
import SocketContext from './components/Socket/SocketContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: "",
        element: <PostSection />
      },
    ]
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/profile/:id',
    element: <Profile />,
  },
  {
    path: '/postview',
    element: <PostViewer />
  },
  {
    path: '/profile/edit/:id', // Dynamic route for editing profile
    element: <EditProfile />
  },
  {
    path: '/explore', // Dynamic route for editing profile
    element: <Explore />
  },
  {
    path: '/reels', // Dynamic route for editing profile
    element: <Reels />
  },
  {
    path: '/chat', // Dynamic route for editing profile
    element: <ChatPage />
  }
]);



createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* Correctly provide the store to the Provider */}
      <PersistGate loading={null} persistor={persistor}>
        <SocketContext /> {/* Include SocketContext here */}
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
