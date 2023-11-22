import { inject } from '@angular/core';
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from '../services/auth.service';

export const LoggedGuard: CanActivateFn = async () => {
    const router = inject(Router);
    const auth = inject(AuthService);

    const isLogged = !!(await auth.tryAutoLogin().catch(() => false));

    if (!isLogged) { return router.parseUrl('/auth'); }

    return isLogged;
} 