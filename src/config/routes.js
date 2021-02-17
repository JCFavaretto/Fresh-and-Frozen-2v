//Layout
import LayoutAdmin from "layouts/LayoutAdmin";
import LayoutBasic from "layouts/LayoutBasic";

//Admin Pages
import AdminHome from "pages/Admin";
import AdminSignIn from "pages/Admin/SignIn";
import User from "pages/Admin/User";
import AdminError404 from "pages/Admin/Error404";
import AdminProducts from "pages/Admin/Products";

//Pages
import Home from "pages/Web/Home";
import Nosotros from "pages/Web/Nosotros";
import Login from "pages/Web/Login";
import Error404 from "pages/Error404";
import Products from "pages/Web/Products";

const routes = [
  {
    path: "/admin",
    component: LayoutAdmin,
    exact: false,
    routes: [
      {
        path: "/admin",
        component: AdminHome,
        exact: true,
      },
      {
        path: "/admin/login",
        component: AdminSignIn,
        exact: true,
      },
      {
        path: "/admin/users",
        component: User,
        exact: true,
      },
      {
        path: "/admin/productos",
        component: AdminProducts,
        exact: true,
      },
      {
        component: AdminError404,
      },
    ],
  },
  {
    path: "/",
    component: LayoutBasic,
    exact: false,
    routes: [
      {
        path: "/",
        component: Home,
        exact: true,
      },
      {
        path: "/nosotros",
        component: Nosotros,
        exact: true,
      },
      {
        path: "/login",
        component: Login,
        exact: true,
      },
      {
        path: "/productos",
        component: Products,
        exact: true,
      },
      {
        path: "/productos/:categoria",
        component: Products,
        exact: true,
      },
      {
        component: Error404,
      },
    ],
  },
];

export default routes;
