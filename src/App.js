import { useEffect } from "react";
import { Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./App.css";

import AppRoutes from "./Routes/AppRoutes.js";
import disableBrowserAutocomplete from "./Utilities/DisableAutocomplete.js";
import WarningMessage from "./Components/WarningMessage.jsx";

function App() {
  //   useEffect(() => {
  //     const cleanup = disableBrowserAutocomplete();
  //     return () => cleanup();
  //   }, []);

  return (
    <div className="App">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <WarningMessage />
      <Routes>{AppRoutes()}</Routes>
    </div>
  );
}

export default App;
