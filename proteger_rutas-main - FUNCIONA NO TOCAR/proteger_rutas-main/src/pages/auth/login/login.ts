import { findUserByEmail, setSession, initAdmin } from '../../../utils/localStorage';

initAdmin(); // asegura que exista una cuenta admin 

const form = document.getElementById('login-form') as HTMLFormElement | null;
const errorDiv = document.getElementById('error') as HTMLDivElement | null;

const showError = (msg: string) => { if (errorDiv) errorDiv.textContent = msg; };

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = (document.getElementById('email') as HTMLInputElement).value.trim().toLowerCase();
    const password = (document.getElementById('password') as HTMLInputElement).value;

    const user = findUserByEmail(email);
    if (!user || user.password !== password) return showError('Credenciales inválidas.');

    setSession({ ...user, loggedIn: true });

    if (user.role === 'admin') location.href = '/src/pages/admin/home/home.html';
    else location.href = '/src/pages/client/home/home.html';
  });
}
