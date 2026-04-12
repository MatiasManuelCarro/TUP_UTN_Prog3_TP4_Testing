import type { IUser } from "../types/IUser";

const USERS = 'users';
const ACTIVE_USER = 'userData';


export function saveUser(user: IUser & { password: string }): void {
  const users = getUser(); // recupera el array actual
  users.push(user);        // agrega el nuevo usuario
  localStorage.setItem(USERS, JSON.stringify(users));
}


export function getUser(): (IUser & { password: string })[] {
  const userData = localStorage.getItem(USERS);
  return userData ? JSON.parse(userData) : [];
}


//Devuelve el usuario logeado en el momento
export const getUserData = () => {
  return localStorage.getItem(ACTIVE_USER);
};

//quita el usuario
export const removeUser = () => {
  localStorage.removeItem(ACTIVE_USER);
};

export const findUserByEmail = (email: string) => {
  //busca usuario, si es null lo pasa a undefined
  const users = getUser();
  const foundUser = users.find(u => u.email === email)
  
  if (!foundUser) {
    return undefined;
  }

  return foundUser;
};

// Creacion del admin
export const initAdmin = () => {
  const users = getUser();
  const adminExists = users.some(u => u.role === 'admin');
  if (!adminExists) {
    const adminUser: IUser & { password: string } = {
      email: 'admin@system.local',
      password: 'admin123',
      role: 'admin',
      loggedIn: false
    };
    saveUser(adminUser); // guarda solo el admin
  }
};
