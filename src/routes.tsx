import ErrorPage from "./error-page";
import About from "./pages/about";
import Homepage from "./pages/homepage";

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
];
