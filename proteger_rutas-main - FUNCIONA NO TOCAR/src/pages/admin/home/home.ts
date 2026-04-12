import { checkAuthUser, logout } from "../../../utils/auth";

const buttonLogout = document.getElementById("logoutButton") as HTMLButtonElement;
buttonLogout?.addEventListener("click", () => logout());

const initPage = () => {
  console.log("Inicio de página admin");
  checkAuthUser(
    "/src/pages/auth/login/login.html",   // si no hay sesión → login
    "/src/pages/client/home/home.html",   // si rol incorrecto → cliente
    "admin"                               // rol requerido
  );
};
initPage();
