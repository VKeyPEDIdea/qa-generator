import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ProjectListPage from 'pages/ProjectListPage/ProjectListPage';
import GeneratorPage from 'pages/GeneratorPage';

const ROUTES = {
  root: '/',
  generator: '/generator/:projectName',
};

const router = createBrowserRouter([
  {
    path: ROUTES.root,
    element: <ProjectListPage />,
  },
  {
    path: ROUTES.generator,
    element: <GeneratorPage />,
  },
]);

export default router;
