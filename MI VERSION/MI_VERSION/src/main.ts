import { getUserData } from "./utils/localStorage";
import { navigate } from "./utils/navigate";
import type { IUser } from "./types/IUser";

export function guard(requiredRole?: "admin" | "client") {
    const userData = getUserData();

    if (!userData) {
        // No hay sesión → al login
        navigate("/src/pages/auth/login/login.html");
        return;
    }

    const user: IUser = JSON.parse(userData);

    if (requiredRole && user.role !== requiredRole) {
        // Tiene sesión pero no el rol correcto
        if (user.role === "client") {
            navigate("/src/pages/client/home/home.html");
        } else {
            navigate("/src/pages/admin/home/home.html");
        }
    }
}
