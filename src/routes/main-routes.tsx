import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRoute from "../routes/public-routes";
import { Login } from "../modules/auth/presentation/views";
import PrivateRoute from "../routes/private-routes";
import Home from "../modules/home/presentation/views";
import { UserList } from "../modules/admin/user_management/presentation/views/user-list";
import ScreenBuilder from "../modules/admin/screen_management/presentation/screens/screen-builder";
import ScreenList from "../modules/admin/screen_management/presentation/screens/screen-list";
import ScreenEdit from "../modules/admin/screen_management/presentation/screens/screen-edit";

export const MainRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta pública general */}
        <Route path="/" element={<Home />} />
        <Route path="/home/:screenId?" element={<Home />} />
        {/* Rutas públicas */}
        <Route path="/access-to-dashboard" element={<PublicRoute />}>
          <Route path="login" element={<Login />} />
        </Route>

        {/* Rutas privadas */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="screen-builder" element={<ScreenBuilder />} />
          <Route path="user-list" element={<UserList />} />
          <Route path="screens" element={<ScreenList />} />
          <Route path="screen-edit/:screenId" element={<ScreenEdit />} />
        </Route>
      </Routes>
    </Router>
  );
};
