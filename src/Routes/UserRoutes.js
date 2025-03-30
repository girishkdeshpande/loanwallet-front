import React from "react";
import { Route } from "react-router-dom";

import NewUser from "../Pages/User/NewUser";
import ViewUsers from "../Pages/User/ViewUsers";

const UserRoutes = () => [
  <Route>
    <Route path="/newuser" element={<NewUser />} key="newuser" />
    <Route path="/viewusers" element={<ViewUsers />} key="viewusers" />
  </Route>,
];

export default UserRoutes;
