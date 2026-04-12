import { navigate } from "../../../utils/navigate";
import { saveUser, findUserByEmail } from "../../../utils/localStorage";

const form = document.getElementById("login-form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

form.addEventListener("submit", handleLogin);

// Función que maneja el login
function handleLogin(e: SubmitEvent) {
    e.preventDefault(); 

  const userEmail = inputEmail.value.trim().toLowerCase();
  const userPassword = inputPassword.value;

  // Buscar usuario
  const user = findUserByEmail(userEmail);

if (!user) {
    return alert("No existe un usuario con ese email.");
  }

  if (user.password !== userPassword) {
    return alert("Contraseña incorrecta.");
  }

 // Guardar sesión iniciada
  user.loggedIn = true;
  saveUser(user);

  //Guarda el usuario logeado en este momento en localStorage
  const parseUser = JSON.stringify(user);
  localStorage.setItem("userData", parseUser);

//verificar roles
  if (user.role === "admin") {
    navigate("/src/pages/admin/home/home.html");
  } else {
    navigate("/src/pages/client/home/home.html");
  }
}

