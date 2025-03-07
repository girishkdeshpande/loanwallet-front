import React from "react";
import { Route } from "react-router-dom";

import NewUser from "../Pages/User/NewUser";
import ViewUsers from "../Pages/User/ViewUsers";

const UserRoutes = () => (
  <>
    <Route path="/newuser" element={<NewUser />} />
    <Route path="/viewusers" element={<ViewUsers />} />
  </>
);

export default UserRoutes;