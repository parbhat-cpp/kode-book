import ErrorPage from "./error-page";
import About from "./pages/about";
import Homepage from "./pages/homepage";
import UpdatePassword from "./pages/update-password";

export const routes = [
  {
    path: "/",
    element: <Homepage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/update-password",
    element: <UpdatePassword />,
  },
];
