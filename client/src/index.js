import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/signup';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const urls = createBrowserRouter([
  {path: '/', element: <Home />},
  {path: '/login', element: <Login/>},
  {path: '/signup', element: <Signup/>}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={urls}/>
  </React.StrictMode>
);