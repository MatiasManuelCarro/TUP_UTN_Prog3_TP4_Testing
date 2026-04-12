import type { IUser } from "../types/IUser";

const USERS = 'users';
const  ACTIVE_USER = 'userData';

export function saveUser(user: IUser & { password: string }): void {
  const parseUser = JSON.stringify(user);
  localStorage.setItem(USERS, parseUser);
}

export function getUser(): (IUser & { password: string })[] {
  const userData = localStorage.getItem(USERS)

  //verifica que no sea array vacio o null
  //si es asi devuelve un array vacio
  if (userData === null) {
    return [];
  }

  if (userData === "") {
    return [];
  }

//devuelve parse data con datos + pasword
return JSON.parse(userData) as (IUser & { password: string })[];
}

//Devuelve el usuario logeado en el momento
export const getUserData = () => {
  return localStorage.getItem(ACTIVE_USER);
};

export const removeUser = () => {
  localStorage.removeItem("userData");
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
