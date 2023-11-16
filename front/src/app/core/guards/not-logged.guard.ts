import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const NotLoggedGuard: CanActivateFn = async ()=> {
    const router = inject(Router);
    const auth = inject(AuthService);

    const isLogged = !!(await auth.tryAutoLogin().catch(() => false));

    if (isLogged) { return router.parseUrl(''); }

    return !isLogged;

}