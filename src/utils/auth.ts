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
    navigate(redireccion1);
    return false;
  } else {
    if (user.role !== rol) {
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
    navigate("/src/pages/store/home/home.html");
  } else if (rol === "client") {
    navigate("/src/pages/store/home/home.html");
  }

}