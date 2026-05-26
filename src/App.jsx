import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Country } from "./pro/Country";
import { CountryDetails } from "./pro/AppLayout/CountoryDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Country />,
  },
  {
    path: "/country/:id",
    element: <CountryDetails />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
