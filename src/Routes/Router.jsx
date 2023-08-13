import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
// Route Elements
import App from "../App";
import LandingPage from "../frontend/Pages/LandingPage/LandingPage";
import Login from "../frontend/Pages/Login/Login";
import Home from "../frontend/components/Home/Home";
import Archives from "../frontend/components/Archives/Archives";
import Trash from "../frontend/components/Trash/Trash";
import Labels from "../frontend/components/Labels/Labels";
import PageNotFound from "../frontend/Pages/PageNotFound/PageNotFound";
import PrivateRoute from "../frontend/components/PrivateRoute/PrivateRoute";
import AuthRoute from "../frontend/components/AuthRoute/AuthRoute";
// import Layout from "../frontend/components/Layout/Layout";

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={<App />}>
          <Route element={<PrivateRoute />}>
            <Route index element={<Home />} />
            <Route path="/archives" element={<Archives />} />
            <Route path="/labels" element={<Labels />} />
            <Route path="/trash" element={<Trash />} />
          </Route>
        </Route>

        <Route element={<AuthRoute />}>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
        </Route>
      </>
    )
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default Router;
