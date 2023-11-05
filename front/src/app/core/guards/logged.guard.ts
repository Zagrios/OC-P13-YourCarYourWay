import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const LoggedGuard: CanActivateFn = () => {
    const router = inject(Router);

    const isLogged = true;

    if(!isLogged){ return router.parseUrl('auth'); }

    return true;
}