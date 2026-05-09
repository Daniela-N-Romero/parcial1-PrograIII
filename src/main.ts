import { getUsers, saveUser } from "./utils/localStorage.ts"
import type { IUserStorage } from "./types/IUserStorage.ts";


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

document.addEventListener('DOMContentLoaded', () => {
       seedAdmin();
});





