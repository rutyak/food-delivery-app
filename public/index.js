import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Help from "./pages/help/Help";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import Menu from "./pages/menu/Menu";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";
import { store } from "./store";
import VariableProvider from "../context/VariableProvider";
import Privateroute from "./components/privateroute/Privateroute";

const About = lazy(() => import("./pages/about/About"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: (
      <Suspense fallback={<h2>Loading</h2>}>
        <About />
      </Suspense>
    ),
  },
  {
    path: "/help",
    element: <Help />,
  },
  {
    path: "/cart",
    element: <Privateroute><Cart /></Privateroute>,
  },
  {
    path: "/menu/:id",
    element: <Menu />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <VariableProvider>
        <ChakraProvider>
          <RouterProvider router={router} />
        </ChakraProvider>
      </VariableProvider>
    </PersistGate>
  </Provider>
);
