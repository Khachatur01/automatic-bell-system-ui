import { Routes } from '@angular/router';
import { appGuard } from '../guard/app-guard';

export const routes: Routes = [
    {
        path: '',
        canActivate: [ appGuard, ],
        // eslint-disable-next-line @typescript-eslint/typedef
        loadComponent: async() => import('@pages/main').then((module) => module.MainComponent),
        children: [
            {
                path: '',
                canActivate: [ appGuard, ],
                // eslint-disable-next-line @typescript-eslint/typedef
                loadComponent: async() => import('@widgets/information').then((module) => module.InformationComponent),
            },
            {
                path: 'create-alarm',
                canActivate: [ appGuard, ],
                // eslint-disable-next-line @typescript-eslint/typedef
                loadComponent: async() => import('@widgets/alarms').then((module) => module.CreateAlarmComponent),
            },
            {
                path: 'adjust-clock',
                canActivate: [ appGuard, ],
                // eslint-disable-next-line @typescript-eslint/typedef
                loadComponent: async() => import('@widgets/clock').then((module) => module.ClockComponent),
            },
            {
                path: 'passwords',
                canActivate: [ appGuard, ],
                // eslint-disable-next-line @typescript-eslint/typedef
                loadComponent: async() => import('@widgets/password').then((module) => module.PasswordsComponent),
            },
        ],
    },
    {
        path: 'login',
        // eslint-disable-next-line @typescript-eslint/typedef
        loadComponent: async() => import('@pages/auth/login').then((module) => module.LoginComponent),
    },
];
