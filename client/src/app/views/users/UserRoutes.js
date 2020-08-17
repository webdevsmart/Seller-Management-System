import { EgretLoadable } from "egret";
import { authRoles } from "../../auth/authRoles";

const UserList = EgretLoadable({
  loader: () => import("./UserList")
});

const userRoutes = [
  {
    path: "/users/list",
    exact: true,
    component: UserList,
    auth: authRoles.admin
  },
];

export default userRoutes;
