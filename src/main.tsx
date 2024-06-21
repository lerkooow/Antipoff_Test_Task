import "@fontsource/roboto";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./features/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RegistrationForm from "./pages/RegistrationForm/RegistrationForm";
import SingleMember from "./pages/SingleMember/SingleMember";
import OurTeam from "./pages/OurTeam/OurTeam";
import LoginForm from "./pages/LoginForm/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProtectedRouteLoginUser from "./components/ProtectedRoute/ProtectedRouteLoginUser";

const router = createBrowserRouter([
  {
    path: "/account/registration",
    element: (
      <ProtectedRouteLoginUser>
        <RegistrationForm />
      </ProtectedRouteLoginUser>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <OurTeam />
      </ProtectedRoute>
    ),
  },
  {
    path: "/users/:id",
    element: (
      <ProtectedRoute>
        <SingleMember />
      </ProtectedRoute>
    ),
  },
  {
    path: "/account/login",
    element: (
      <ProtectedRouteLoginUser>
        <LoginForm />
      </ProtectedRouteLoginUser>
    ),
  },
]);

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
