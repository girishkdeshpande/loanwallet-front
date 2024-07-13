// import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import LoginPage from "./Login/LoginPage.jsx";
import "./Login/LoginPage.css";
import HomePage from "./Home/HomePage.jsx";
import NewUser from "./User/NewUser.jsx";
import NewUser1 from "./User/NewUser1.jsx";
import ViewUsers from "./User/ViewUsers.jsx";
import NewCompany from "./Company/NewCompany.jsx";
import NewCompany1 from "./Company/NewCompany1.jsx";
import NewProduct from "./Product/NewProduct.jsx";
import ViewVisits from "./Visit/ViewVisits.jsx";
import NewProduct1 from "./Product/NewProduct1.jsx";
import NewQuotation from "./Quotation/NewQuotation.jsx";


function App() {
  return (
    <div className="App">
      <LoginPage/>      
      {/* <HomePage/> */}
      {/* <NewUser/> */}
      {/* <NewUser1/> */}
      {/* <ViewUsers/> */}
      {/* <NewProduct/> */}
      {/* <NewProduct1/> */}
      {/* <NewCompany/> */}
      {/* <NewCompany1/> */}
      {/* <ViewVisits/> */}
      {/* <NewQuotation/> */}
    </div>
  );
}

export default App;
