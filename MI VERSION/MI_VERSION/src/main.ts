//import { getUserData } from "./utils/localStorage";
//import { navigate } from "./utils/navigate";
//import type { IUser } from "./types/IUser";
import { initAdmin } from "./utils/localStorage";
import { checkAuhtUser } from "./utils/auth";

// Ejecuta la creación del admin si no existe
initAdmin();

//proteccion de las paginas
checkAuhtUser();

