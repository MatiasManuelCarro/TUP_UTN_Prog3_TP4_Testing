// src/utils/auth.ts
import { getSession, clearSession } from './localStorage';

/**
 * Valida que el usuario esté logueado y tenga el rol correcto.
 * Si no cumple, redirige a la URL correspondiente.
 */
export const checkAuthUser = (
  loginUrl: string,
  fallbackUrl: string,
  requiredRole: 'admin' | 'client'
) => {
  const session = getSession();
  if (!session || !session.loggedIn) {
    location.href = loginUrl;
    return;
  }
  if (session.role !== requiredRole) {
    location.href = fallbackUrl;
    return;
  }
};

/**
 * Limpia la sesión y redirige al login.
 */
export const logout = () => {
  clearSession();
  location.href = '/src/pages/auth/login/login.html';
};
