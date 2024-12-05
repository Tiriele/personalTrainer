import React from 'react';
import { createRoot } from 'react-dom/client'
import { RouterProvider, createHashRouter } from 'react-router-dom';
import './index.css'

import App from './App.jsx'
import Customerlist from './components/Customerlist.jsx';
import Traininglist from './components/Traininglist.jsx';

const router = createHashRouter([
  {
      basename: import.meta.env.BASE_URL,
      path: "/",
      element: <App />,
      children: [
        {
          element: <Customerlist />,
          index: true
        },
        {
          path: "exercises",
          element: <Traininglist />,
        }
      ]
  }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
