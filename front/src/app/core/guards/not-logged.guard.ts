import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const NotLoggedGuard: CanActivateFn = () => {
    const router = inject(Router);

    const isLogged = false;

    if(isLogged){ return router.parseUrl(''); }

    return true;
}