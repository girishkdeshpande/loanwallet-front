import LoginRoutes from "./LoginRoutes";
import HomeRoutes from "./HomeRoutes";

const AppRoutes = () => [...LoginRoutes(), ...HomeRoutes()];
export default AppRoutes;
