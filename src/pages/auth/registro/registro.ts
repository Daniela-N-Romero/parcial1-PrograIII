import type { IUserStorage } from '../../../types/IUserStorage';
import { rolRedirect } from '../../../utils/auth';
import { getUsers, loginUser, saveUser } from '../../../utils/localStorage'

const form = document.getElementById("registro-form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

form?.addEventListener("submit", (e:SubmitEvent)=>{
    e.preventDefault();
    const valueEmail = inputEmail.value;
    const valuePassword = inputPassword.value;
    const users = getUsers();
    const newUser: IUserStorage = {
        email: valueEmail,
        //solo creamos usuarios clientes. El Admin se da por defecto
        role: 'client',
        loggedIn: true,
        password: valuePassword,
        id: crypto.randomUUID()
      };
    
    const existeUsuario = users.some((user) => user.email === valueEmail);
      
    if (!existeUsuario){
        saveUser(newUser)
        const { password, id, ...userToLog } = newUser;
        loginUser(userToLog)
        alert("Usuario Registrado. Redirigiendo al home...")
        setTimeout(() => rolRedirect(newUser.role), 1500)
    }else{
        alert("Email no disponible.")
    }

}
)
