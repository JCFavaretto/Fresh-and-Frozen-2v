//Layout
import LayoutAdmin from "layouts/LayoutAdmin";
import LayoutBasic from "layouts/LayoutBasic";

//Admin Pages
import AdminHome from "pages/Admin";
import AdminSignIn from "pages/Admin/SignIn";
import AdminError404 from "pages/Admin/Error404";

//Pages
import Contact from "pages/Contact";
import Home from "pages/Home";
import Error404 from "pages/Error404";

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
        path: "/contact",
        component: Contact,
        exact: true,
      },
      {
        component: Error404,
      },
    ],
  },
];

export default routes;
