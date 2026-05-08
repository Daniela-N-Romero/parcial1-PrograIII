import type { IUser } from "./types/IUser.ts";
import { getUser, getUsers, saveUser } from "./utils/localStorage.ts"
import { rolRedirect , logout } from "./utils/auth.ts";
import type { IUserStorage } from "./types/IUserStorage.ts";


const greeting = document.getElementById("user-email")
const sessionNotice = document.getElementById("session-notice")
const guestSession = document.getElementById("guest-section")
const btnContinue = document.getElementById("btn-continue")
const btnLogout = document.getElementById("btn-logout")



document.addEventListener('DOMContentLoaded', () => {
    seedAdmin();

    const user = getUser();
    if (user)  {
        const parsedUser: IUser = JSON.parse(user);
        displaySessionNotice(true, parsedUser.email );
       
        btnContinue?.addEventListener("click", ()=>{
            rolRedirect(parsedUser.role);
        })
         btnLogout?.addEventListener("click", ()=>{
            logout();
        })
    } 
    else{displaySessionNotice(false);}

    

});

const seedAdmin = () => {
    const users = getUsers(); 
    const adminExists = users.some(u => u.role === 'admin');

    if (!adminExists) {
        const adminDefault: IUserStorage = {
            email: "admin@test.com",
            password: "password123",
            role: "admin",
            loggedIn: false,
            id: "admin-001"
        };
        saveUser(adminDefault)
        console.log("Admin por defecto creado.");
    }
};

const displaySessionNotice = (flag:boolean, email?:string) =>{
    if (flag)  {
        if (sessionNotice && greeting) {
            sessionNotice.style.display = "block";
            email? greeting.innerHTML= email : ''}          
    } 
    else {
        if (guestSession) guestSession.style.display = "block";
    }
};






