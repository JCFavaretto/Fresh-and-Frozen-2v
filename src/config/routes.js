//Layout
import LayoutAdmin from "layouts/LayoutAdmin";
import LayoutBasic from "layouts/LayoutBasic";

//Admin Pages
import AdminSignIn from "pages/Admin/SignIn";
import AdminUser from "pages/Admin/User";
import AdminError404 from "pages/Admin/Error404";
import AdminProducts from "pages/Admin/Products";
import AdminOrders from "pages/Admin/Orders";
import AdminBlog from "pages/Admin/Blog";

//Pages
import Home from "pages/Web/Home";
import Nosotros from "pages/Web/Nosotros";
import Login from "pages/Web/Login";
import Error404 from "pages/Error404";
import Products from "pages/Web/Products";
import User from "pages/Web/User";
import Buy from "pages/Web/Buy";
import Orders from "pages/Web/Orders";
import Blog from "pages/Web/Blog";
import Reset from "pages/Web/ResetPass";

const routes = [
  {
    path: "/admin",
    component: LayoutAdmin,
    exact: false,
    routes: [
      {
        path: "/admin",
        component: AdminOrders,
        exact: true,
      },
      {
        path: "/admin/login",
        component: AdminSignIn,
        exact: true,
      },
      {
        path: "/admin/users",
        component: AdminUser,
        exact: true,
      },
      {
        path: "/admin/productos",
        component: AdminProducts,
        exact: true,
      },
      {
        path: "/admin/orders",
        component: AdminOrders,
        exact: true,
      },
      {
        path: "/admin/blog",
        component: AdminBlog,
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
        path: "/usuario",
        component: User,
        exact: true,
      },
      {
        path: "/mis-compras",
        component: Orders,
        exact: true,
      },
      {
        path: "/comprar",
        component: Buy,
        exact: true,
      },
      {
        path: "/blog",
        component: Blog,
        exact: true,
      },
      {
        path: "/blog/:id",
        component: Blog,
        exact: true,
      },
      {
        path: "/reset-password",
        component: Reset,
        exact: true,
      },
      {
        component: Error404,
      },
    ],
  },
];

export default routes;
