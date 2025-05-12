import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@shared';

export const appGuard: CanActivateFn = async(): Promise<boolean> => {
    const router: Router = inject(Router);
    const authService: AuthService = inject(AuthService);

    if (await authService.isAccessTokenValid()) {
        return true;
    }

    await router.navigate([ '/', 'login', ]);
    return false;
};
