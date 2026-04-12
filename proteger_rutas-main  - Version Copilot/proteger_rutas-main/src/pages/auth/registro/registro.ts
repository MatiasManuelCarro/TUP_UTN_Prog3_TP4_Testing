import { addUser, findUserByEmail } from '../../../utils/localStorage';
import type { IUser } from '../../../types/IUser';

const form = document.getElementById('registro-form') as HTMLFormElement | null;
const errorDiv = document.getElementById('error') as HTMLDivElement | null;

const showError = (msg: string) => { if (errorDiv) errorDiv.textContent = msg; };
const clearError = () => { if (errorDiv) errorDiv.textContent = ''; };

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearError();

    const email = (document.getElementById('email') as HTMLInputElement).value.trim().toLowerCase();
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const confirm = (document.getElementById('confirm') as HTMLInputElement).value;

    if (!email) return showError('El email es obligatorio.');
    if (!password || password.length < 6) return showError('La contraseña debe tener al menos 6 caracteres.');
    if (password !== confirm) return showError('Las contraseñas no coinciden.');

    if (findUserByEmail(email)) return showError('Ya existe un usuario con ese email.');

    const newUser: IUser & { password: string } = {
      email,
      password,
      role: 'client',
      loggedIn: false
    };

    addUser(newUser);
    location.href = '/src/pages/auth/login/login.html';
  });
}
