// src/app/authentication/authentication.routes.ts
import { Routes } from '@angular/router';

export const AUTHENTICATION_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        title: 'Login',
        loadComponent: () =>
          import('./login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        title: 'Registration',
        loadComponent: () =>
          import('./register/register01.component').then(m => m.Register01Component)
      },
      {
        path: 'verify',
        title: 'Verify Account',
        loadComponent: () =>
          import('./verify/verify.component').then(m => m.VerifyComponent)
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  }
];
