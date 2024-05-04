import ProjectListPage from "pages/ProjectListPage/ProjectListPage";
import { createBrowserRouter } from "react-router-dom";

const ROUTES = {
  generator: '/generator/:projectName',
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProjectListPage />,
  },
  {
    path: ROUTES.generator,
    element: <ProjectListPage />,
  }
]);

export default router;
