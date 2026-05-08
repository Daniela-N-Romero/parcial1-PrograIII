import type { IUser } from "../types/IUser";
import type { Rol } from "../types/Rol";
import { getUser, removeUser } from "./localStorage";
import { navigate } from "./navigate";

export const checkAuhtUser = (
  redireccion1: string,
  redireccion2: string,
  rol: Rol
) => {
  console.log("comienzo de checkeo");

  const user = getUser();

  if (!user) {
    console.log("no existe en local");
    navigate(redireccion1);
    return false;
  } else {
    
    const parseUser: IUser = JSON.parse(user);
    if (parseUser.role !== rol) {
      console.log("existe pero no tiene el rol necesario");
      navigate(redireccion2);
      return false;
    }
  }
  return true;
};

export const logout = () => {
  removeUser();
  navigate("/src/pages/auth/login/login.html");
};

export const rolRedirect = (rol: string)=>{
  if (rol === "admin") {
    navigate("/src/pages/admin/home/home.html");
  } else if (rol === "client") {
    navigate("/src/pages/client/home/home.html");
  }

}