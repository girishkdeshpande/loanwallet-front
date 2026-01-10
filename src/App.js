import $ from "jquery";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-select/dist/js/bootstrap-select.min.js";
import "bootstrap-select/dist/css/bootstrap-select.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import AppRoutes from "./Routes/AppRoutes.js";
// import disableBrowserAutocomplete from "./Utilities/DisableAutocomplete.js";
import WarningMessage from "./Components/WarningMessage.jsx";
window.$ = $;
window.jQuery = $;

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
