import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import AvailableCamps from "../Pages/AvailableCamps/AvailableCamps";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import UpdateProfile from "../Pages/UpdateProfile/UpdateProfile";
import ViewCamp from "../Pages/ViewCamp/ViewCamp";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Dashboard from "../Pages/Dashboard/Dashboard";
import OrganizerProfile from "../Dashboard/Organizer/OrganizerProfile/OrganizerProfile";
import AddACamp from '../Dashboard/Organizer/AddACamp/AddACamp';
import ManageCamps from '../Dashboard/Organizer/ManageCamps/ManageCamps';
import ManageRegisteredCamps from '../Dashboard/Organizer/ManageRegisteredCamps/ManageRegisteredCamps';
import Analytics from "../Dashboard/Participants/Analytics/Analytics";
import ParticipantProfile from "../Dashboard/Participants/ParticipantProfile/participantProfile";
import RegisteredCamps from '../Dashboard/Participants/RegisteredCamps/RegisteredCamps';
import PaymentHistory from '../Dashboard/Participants/PaymentHistory/PaymentHistory';
import ManageUsers from "../Dashboard/Organizer/ManageUsers/ManageUsers";
import AdminRoute from "./AdminRoute";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/availableCamps",
        element: (
          <PrivateRoute>
            <AvailableCamps></AvailableCamps>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <SignUp></SignUp>,
      },
      {
        path: "/updateProfile",
        element: <UpdateProfile></UpdateProfile>,
      },
      {
        path: "/camp-details/:id",
        element: <ViewCamp></ViewCamp>,
        loader: ({ params }) =>
          fetch(`https://mediquix-b9-a12-server.vercel.app/camps/${params.id}`),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
        children: [
          {
            path: "/dashboard/organizerProfile",
            element: (
              <AdminRoute>
                <OrganizerProfile></OrganizerProfile>
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/manageUsers",
            element: (
              <AdminRoute>
                <ManageUsers></ManageUsers>
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/addCamp",
            element: (
              <AdminRoute>
                <AddACamp></AddACamp>
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/manageCamps",
            element: (
              <AdminRoute>
                <ManageCamps></ManageCamps>
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/manageRegisteredCamps",
            element: (
              <AdminRoute>
                <ManageRegisteredCamps></ManageRegisteredCamps>
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/analytics",
            element: (
              <PrivateRoute>
                <Analytics></Analytics>
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/participantProfile",
            element: (
              <PrivateRoute>
                <ParticipantProfile></ParticipantProfile>
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/registeredCamps",
            element: (
              <PrivateRoute>
                <RegisteredCamps></RegisteredCamps>
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/paymentHistory",
            element: (
              <PrivateRoute>
                <PaymentHistory></PaymentHistory>
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
]);
