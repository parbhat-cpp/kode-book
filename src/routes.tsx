import ErrorPage from "./error-page";
import About from "./pages/about";
import Dashboard from "./pages/dashboard";
import Friends from "./pages/friends";
import Homepage from "./pages/homepage";
import Profile from "./pages/profile";
import Projects from "./pages/projects";
import Settings from "./pages/settings";
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
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/friend-list",
    element: <Friends />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/profile/:username",
    element: <Profile />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
];
