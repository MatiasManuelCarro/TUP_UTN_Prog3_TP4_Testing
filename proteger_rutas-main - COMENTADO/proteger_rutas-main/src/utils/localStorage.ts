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
  users.push(user);
  saveUsers(users);
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