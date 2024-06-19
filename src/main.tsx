import "@fontsource/roboto";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./features/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm.jsx";
import SingleMember from "./components/SingleMember/SingleMember.jsx";
import OurTeam from "./components/OurTeam/OurTeam.jsx";
import LoginForm from "./components/LoginForm/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RegistrationForm />,
  },
  {
    path: "/our-team",
    element: (
      <ProtectedRoute>
        <OurTeam />
      </ProtectedRoute>
    ),
  },
  {
    path: "/:id",
    element: (
      <ProtectedRoute>
        <SingleMember />
      </ProtectedRoute>
    ),
  },
  {
    path: "/account/login",
    element: <LoginForm />,
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
