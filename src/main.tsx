import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen' // Auto-generated file
import './index.css'

const router = createRouter({
  routeTree: routeTree,
  basepath: '/insect-betyar',
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />;
  </React.StrictMode>,
);
