import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        // eslint-disable-next-line @typescript-eslint/typedef
        loadComponent: async() => import('@pages/main').then((module) => module.MainComponent),
        children: [
            {
                path: '',
                // eslint-disable-next-line @typescript-eslint/typedef
                loadComponent: async() => import('@widgets/information').then((module) => module.InformationComponent),
            },
            {
                path: 'create-alarm',
                // eslint-disable-next-line @typescript-eslint/typedef
                loadComponent: async() => import('@widgets/alarms').then((module) => module.CreateAlarmComponent),
            },
            {
                path: 'adjust-clock',
                // eslint-disable-next-line @typescript-eslint/typedef
                loadComponent: async() => import('@widgets/clock').then((module) => module.ClockComponent),
            },
            {
                path: 'passwords',
                // eslint-disable-next-line @typescript-eslint/typedef
                loadComponent: async() => import('../2-widgets/password').then((module) => module.PasswordsComponent),
            },
        ],
    },
    {
        path: 'login',
        // eslint-disable-next-line @typescript-eslint/typedef
        loadComponent: async() => import('@pages/auth/login').then((module) => module.LoginComponent),
    },
];
