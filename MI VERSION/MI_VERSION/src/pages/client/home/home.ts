import { checkAuhtUser, logout } from "../../../utils/auth";

const buttonLogout = document.getElementById(
  "logoutButton"
) as HTMLButtonElement;
buttonLogout?.addEventListener("click", () => {
  logout();
});


// const initPage = () => {
//   console.log("inicio de pagina");
//   checkAuhtUser();
// };
// initPage();
