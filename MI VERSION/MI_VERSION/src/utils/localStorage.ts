import type { IUser } from "../types/IUser";
//
//export const addUser = 

//export const saveUser = (user: IUser) => {
//  const parseUser = JSON.stringify(user);
// const usuarioDuplicado = localStorage.getItem(user.email);
//revisar logica de duplicado!!!!!!!!!!
// if (!usuarioDuplicado){
//localStorage.setItem(user.email, parseUser);
// console.log("usuario creado")
// } else{
//   console.log("usuario duplicado")
// }
//};
// export const getUser = () => {
//   return localStorage.getItem("userData");
// };

export function saveUser(user: IUser & { password: string }): void {
  const parseUser = JSON.stringify(user);
  localStorage.setItem("userData", parseUser);
}

export function getUser(): (IUser & { password: string })[] {
  const userData = localStorage.getItem("users")

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
