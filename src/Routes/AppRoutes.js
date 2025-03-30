import LoginRoutes from "./LoginRoutes";
import HomeRoutes from "./HomeRoutes";
import UserRoutes from "./UserRoutes";

const AppRoutes = () => [
    ...LoginRoutes(),
    ...HomeRoutes(),
    ...UserRoutes(),
  ];
export default AppRoutes;
