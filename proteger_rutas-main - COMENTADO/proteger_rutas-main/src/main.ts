// Ver detalles en DOCUMENTACION.md#srcmain.ts

import { getSession } from './utils/localStorage';
export function checkAccess(requiredRole?: 'admin' | 'client') {
  const session = getSession();
  if (!session || !session.loggedIn) {
    location.replace('/src/pages/auth/login/login.html');
    return;
  }
  if (requiredRole && session.role !== requiredRole) {
    if (session.role === 'admin') {
      location.replace('/src/pages/admin/home/home.html');
    } else {
      location.replace('/src/pages/client/home/home.html');
    }
  }
}
