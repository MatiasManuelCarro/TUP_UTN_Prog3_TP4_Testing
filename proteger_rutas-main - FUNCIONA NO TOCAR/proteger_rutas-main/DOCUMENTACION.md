# Documentacion Proyecto

## SRC/main.ts

[Ver código fuente](src/main.ts)

```bash
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
```

Que hace:

```bash
import { getSession } from './utils/localStorage';
```
- Importa la función getSession desde tu módulo de utilidades.

- Esa función lee del localStorage el objeto de sesión (userData) que guarda email, rol y estado de login.

```bash
export function checkAccess(requiredRole?: 'admin' | 'client') {
```

- Define y exporta la función checkAccess.
- El parámetro requiredRole es opcional (?) y puede ser 'admin' o 'client'.
- Si no se pasa, la función solo valida que haya sesión activa.
- Si se pasa, además valida que el rol coincida.

```bash
 const session = getSession();
 ```

 - Obtiene la sesión actual desde localStorage. 
 - Si no hay nada guardado, session será null.

```bash
  if (!session || !session.loggedIn) {
    location.replace('/src/pages/auth/login/login.html');
    return;
  }
```
- Si no existe sesión (!session) o el usuario no está logueado (!session.loggedIn), se redirige al login.

- location.replace cambia la URL actual y evita que el usuario vuelva atrás con el botón del navegador.

- return corta la ejecución de la función.

```bash
  if (requiredRole && session.role !== requiredRole) {
    if (session.role === 'admin') {
      location.replace('/src/pages/admin/home/home.html');
    } else {
      location.replace('/src/pages/client/home/home.html');
    }
  }
}
```

- Si la página pidió un rol específico (requiredRole) y el rol de la sesión no coincide, se corrige la navegación:

  - Si el usuario es admin pero entró a una página de client, se lo manda a su home admin.

  - Si el usuario es client pero entró a una página de admin, se lo manda a su home client.

- Así se evita que un usuario acceda a páginas que no le corresponden.

---

## SRC/utils/localStorage.ts

[Ver código fuente](src/utils/localStorage.ts)

```bash
import type { IUser } from '../types/IUser';

const USERS_KEY = 'users';
const SESSION_KEY = 'userData';

const normalize = (s: string) => s.trim().toLowerCase();

export const getUsers = (): (IUser & { password: string })[] => {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
  catch { return []; }
};

export const saveUsers = (users: (IUser & { password: string })[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const addUser = (user: IUser & { password: string }) => {
  const users = getUsers();
  const exists = users.some(u => normalize(u.email) === normalize(user.email));
  if (!exists) {
    users.push(user);
    saveUsers(users);
  } else {
    throw new Error("El usuario ya existe");
  }
};


export const findUserByEmail = (email: string) =>
  getUsers().find(u => normalize(u.email) === normalize(email));

export const setSession = (user: IUser) =>
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));

export const getSession = (): IUser | null => {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); }
  catch { return null; }
};

export const clearSession = () => localStorage.removeItem(SESSION_KEY);

// Admin
export const initAdmin = () => {
  const users = getUsers();
  const adminExists = users.some(u => u.role === 'admin');
  if (!adminExists) {
    const adminUser: IUser & { password: string } = {
      email: 'admin@system.local',
      password: 'admin123',
      role: 'admin',
      loggedIn: false
    };
    users.push(adminUser);
    saveUsers(users);
  }
};
```

Que hace:

```bash
import type { IUser } from '../types/IUser';
```
- Importa el tipo IUser desde tu archivo de tipos.

- import type asegura que solo se trae información de tipado, no código ejecutable.

- Así podés usar IUser para definir la forma de los objetos de usuario.

```bash
const USERS_KEY = 'users';
const SESSION_KEY = 'userData';
```

- Define dos constantes con las claves de localStorage:

     -  users → donde se guardan todos los usuarios registrados.

    -  userData → donde se guarda la sesión activa.

```bash
const normalize = (s: string) => s.trim().toLowerCase();
```

- Función auxiliar que normaliza strings: elimina espacios y pasa a minúsculas.

- Se usa para comparar emails sin importar mayúsculas/minúsculas o espacios.

```bash
export const getUsers = (): (IUser & { password: string })[] => {
  try { 
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); 
  }
  catch { 
    return []; 
  }
};
```

- Lee todos los usuarios desde localStorage.

- Si no hay nada, devuelve un array vacío.

- Si hay error al parsear, también devuelve vacío.

- El tipo indica que cada usuario es IUser con un campo extra password.

1. ``` export const getUsers = ... ```

    - Define una constante llamada getUsers.

    - Es una función flecha que se exporta para que otros archivos la usen.

2. ``` (IUser & { password: string })[] ```
    - Un array ([]) de objetos.
    - Cada objeto es la intersección (&) de:
        - IUser (tu interfaz base, con campos como email, role, loggedIn).
        - { password: string } (un campo adicional obligatorio llamado password).

3. ``` try { return JSON.parse(...); } catch { return []; } ```
    - Intenta leer la clave users de localStorage.
    - Si no existe, usa '[]' como valor por defecto.
    - JSON.parse(...) convierte el string en un array de objetos.
    - Si ocurre un error al parsear, devuelve un array vacío.

```bash
export const saveUsers = (users: (IUser & { password: string })[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};
```

- Guarda el array de usuarios en localStorage.

- Convierte el array a JSON antes de almacenarlo.

```bash
export const addUser = (user: IUser & { password: string }) => {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
};

```

- Agrega un nuevo usuario al array existente.


- Primero obtiene todos los usuarios, luego hace push, y finalmente guarda el array actualizado.

```bash
export const findUserByEmail = (email: string) =>
  getUsers().find(u => normalize(u.email) === normalize(email));
```
- Busca un usuario por email.

- Normaliza ambos emails para que la comparación sea insensible a mayúsculas/minúsculas.

- Devuelve el usuario encontrado o undefined.

```bash
export const setSession = (user: IUser) =>
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
```
- Guarda la sesión activa en localStorage.

- Convierte el objeto user a JSON y lo guarda bajo la clave userData.

```bash
export const getSession = (): IUser | null => {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); }
  catch { return null; }
};
```

- Lee la sesión activa desde localStorage.
- Si no existe, devuelve null.
- Si hay error al parsear, también devuelve null.

```bash
export const clearSession = () => localStorage.removeItem(SESSION_KEY);
```

- Elimina la sesión activa del localStorage.

- Se usa en logout.

```bash
// Admin
export const initAdmin = () => {
  const users = getUsers();
  const adminExists = users.some(u => u.role === 'admin');
  if (!adminExists) {
    const adminUser: IUser & { password: string } = {
      email: 'admin@system.local',
      password: 'admin123',
      role: 'admin',
      loggedIn: false
    };
    users.push(adminUser);
    saveUsers(users);
  }
};
```

- Inicializa un usuario admin por defecto si no existe ninguno.

- Revisa si hay algún usuario con rol admin.

- Si no lo hay, crea uno con email admin@system.local y password admin123.

- Lo agrega al array y lo guarda.

- Esto asegura que siempre haya al menos un admin en el sistema.

###  Resumen 

- getUsers / saveUsers → manejan el array de usuarios.

- addUser → agrega un nuevo usuario.

- findUserByEmail → busca por email.

- setSession / getSession / clearSession → manejan la sesión activa.

- initAdmin → garantiza que exista un admin por defecto.

---

## src/utils/auth.ts



import { getSession, clearSession } from './localStorage';

```bash
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
```

Que hace:
```bash
/**
import { getSession, clearSession } from './localStorage';
```

- Importa dos funciones desde el módulo de persistencia:

    - getSession → lee la sesión activa desde localStorage.

    - clearSession → elimina la sesión activa (logout).
    
```bash
    export const checkAuthUser = (
  loginUrl: string,
  fallbackUrl: string,
  requiredRole: 'admin' | 'client'
) => {
```