import type { IUser } from "../../../types/IUser";
import { saveUser, findUserByEmail } from "../../../utils/localStorage";

document.addEventListener('DOMContentLoaded', () => {
const errorMessage = document.getElementById('error') as HTMLDivElement | null;
const form = document.getElementById('register-form') as HTMLFormElement;
form.addEventListener('submit', registerSubmit);

const showError = (msg: string) => {
    if (errorMessage) errorMessage.textContent = msg;
};

const clearError = () => {
    if (errorMessage) errorMessage.textContent = '';
};


function registerSubmit(event: Event) {
    event.preventDefault();
    //deja el error en blanco al cargar;
    clearError();

    //Get Elements
    const email = (document.getElementById('email') as HTMLInputElement).value.trim().toLocaleLowerCase();

    const password = (document.getElementById('password') as HTMLInputElement).value;
    const confirm = (document.getElementById('confirm-password') as HTMLInputElement).value;

    //Verificacion de email y contraseña
    if (email === "") return showError('El email es obligatorio.');
    if (password === "" || password.length < 6) return showError('La contraseña debe tener al menos 6 caracteres.');
    if (password !== confirm) return showError('Las contraseñas no coinciden.');
    //valida si el mail del usuario ya existe, si encuentra algo devuelve error
    if (findUserByEmail(email)?.email === email) return showError('Ya existe un usuario con ese email.');

    //usuario nuevo + contraseña
    const newUser: IUser & { password: string } = {
        email,
        password,
        role: 'client',
        loggedIn: false
    };

    //agrega usuario y cambia a la pagina de login
    saveUser(newUser);
    location.href = '/src/pages/auth/login/login.html';
    console.log("registrarme presionado")
}
});

