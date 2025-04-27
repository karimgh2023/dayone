// app.routes.ts
import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { content } from './shared/routes/content.route';
import { AuthenticationLayoutComponent } from './shared/layouts/authentication-layout/authentication-layout.component';
import { authen } from './shared/routes/auth.route';
import { SupportSystemComponent } from './shared/layouts/support-system/support-system.component';
import { support } from './shared/routes/support.routes';

export const App_Route: Routes = [
  { 
    path: 'auth',
    component: AuthenticationLayoutComponent,
    children: [
      { path: 'login', loadComponent: () => import('./authentication/login/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./authentication/register/register01.component').then(m => m.Register01Component) },
      {  path: 'verify',loadComponent: () => import('./authentication/verify/verify.component').then(m => m.VerifyComponent) } ,
      
      ...authen // Include other authentication routes from auth.route.ts
    ]
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '', component: MainLayoutComponent, children: content },
  { path: 'support', component: SupportSystemComponent, children: support },
  // Add a fallback route for 404 errors
  { path: '**', redirectTo: 'auth/login' }
];