import React from 'react';
import { RouterProvider } from 'react-router';
import './index.css';
import router from './router';

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
