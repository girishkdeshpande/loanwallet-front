// import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import LoginPage from "./Login/LoginPage.jsx";
import "./Login/LoginPage.css";
import HomePage from "./Home/HomePage.jsx";
import NewUser from "./User/NewUser.jsx";
import ViewUsers from "./User/ViewUsers.jsx";
import NewCompany from "./Company/NewCompany.jsx"
import NewCompany1 from "./Company/NewCompany1.jsx"
import NewProduct from "./Product/NewProduct.jsx"
import ViewVisits from "./Visit/ViewVisits.jsx"


function App() {
  return (
    <div className="App">
      {/* <LoginPage/>       */}
      {/* <HomePage/> */}
      {/* <NewUser/> */}
      {/* <ViewUsers/> */}
      {/* <NewProduct/> */}
      {/* <NewCompany/> */}
      <NewCompany1/>
      {/* <ViewVisits/> */}
    </div>
  );
}

export default App;
