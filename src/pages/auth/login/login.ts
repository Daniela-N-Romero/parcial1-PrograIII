import type { IUser } from "../../../types/IUser";
import type { Rol } from "../../../types/Rol";
import { rolRedirect } from "../../../utils/auth";
import { getUsers, loginUser } from "../../../utils/localStorage";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;


form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  const valueEmail = inputEmail.value;
  const valuePassword = inputPassword.value;

  const users = getUsers();
  const usuarioExistente = users.find((u) => u.email === valueEmail);

  if (!usuarioExistente) {
      alert("El email ingresado no existe.")
      inputPassword.value = "";
      return; 
  }

  if (usuarioExistente.password === valuePassword) {
      const user: IUser = {
        email: usuarioExistente.email,
        role: usuarioExistente.role as Rol,
        loggedIn: true,
      };

      loginUser(user);
      rolRedirect(user.role);
  } else {
      alert("Contraseña incorrecta. Por favor, intenta de nuevo.");
      inputPassword.value = "";
  }
});