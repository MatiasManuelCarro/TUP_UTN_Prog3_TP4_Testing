import type { IUser } from "../types/IUser";
import type { Rol } from "../types/Rol";
import { getUserData, removeUser } from "./localStorage";
import { navigate } from "./navigate";


// export const checkAuhtUser = (
//   redireccion1: string,
//   redireccion2: string,
//   rol: Rol
// ) => {
//   console.log("comienzo de checkeo");

//   const user = getUserData();

//   if (!user) {
//     console.log("no existe en local");
//     navigate(redireccion1);
//     return;
//   } else {
//     console.log("existe pero no tiene el rol necesario");

//     const parseUser: IUser = JSON.parse(user);
//     if (parseUser.role !== rol) {
//       navigate(redireccion2);
//       return;
//     }
//   }
// };



export const checkAuhtUser = () => {
  const currentPath = window.location.pathname;
  console.log("Ruta actual:", currentPath);
  const publicRoutes = [
    "/src/pages/auth/login/login.html",
    "/src/pages/auth/registro/registro.html"
  ];

  // Si esta en una ruta publica, no evalua la sesion
  if (publicRoutes.includes(currentPath)) return;

  // Obtener usuario logueado
  const userData = getUserData();
  console.log("Usuario logueado:", userData);

  // Si no hay sesión logeada, redirigir al login
  if (!userData) {
    navigate("../../auth/login/login.html");
    console.log("NO HAY SESION LOGEADA");
    return;

  }


  // Si el usuario es client y quiere entrar a /admin/
  if (currentPath.includes("/admin/") && userData.role !== "admin") {
    navigate("../../client/home/home.html");
    console.log("EL USUARIO ES CLIENT");
    return;
  }
}

export const logout = () => {
  removeUser();
  navigate("/src/pages/auth/login/login.html");
};
