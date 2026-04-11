import { checkAuthUser, logout } from "../../../utils/auth";

const buttonLogout = document.getElementById("logoutButton") as HTMLButtonElement;
buttonLogout?.addEventListener("click", () => logout());

const initPage = () => {
  console.log("Inicio de página cliente");
  checkAuthUser(
    "/src/pages/auth/login/login.html",   // si no hay sesión → login
    "/src/pages/admin/home/home.html",    // si rol incorrecto → admin
    "client"                              // rol requerido
  );
};
initPage();
