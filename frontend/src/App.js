import React from "react";

import "./global.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import Routes from "./routes";

function App() {
  return (
    <>
      <Routes />
      <ToastContainer />
    </>
  );
}

export default App;
