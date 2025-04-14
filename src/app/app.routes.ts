// app.routes.ts
import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { content } from './shared/routes/content.route';
import { AuthenticationLayoutComponent } from './shared/layouts/authentication-layout/authentication-layout.component';
import { authen } from './shared/routes/auth.route';
import { SupportSystemComponent } from './shared/layouts/support-system/support-system.component';
import { support } from './shared/routes/support.routes';
import { TranslationDemoComponent } from './shared/components/translation-demo/translation-demo.component';
import { AuthDebugComponent } from './shared/components/auth-debug/auth-debug.component';

export const App_Route: Routes = [
  { 
    path: 'auth',
    component: AuthenticationLayoutComponent,
    children: [
      { path: 'login', loadComponent: () => import('./authentication/login/login.component').then(m => m.LoginComponent) },
      { path: 'test-login', loadComponent: () => import('./authentication/login/test-login.component').then(m => m.TestLoginComponent) },
      { path: 'register', loadComponent: () => import('./authentication/register/register01.component').then(m => m.Register01Component) },
      {  path: 'verify',loadComponent: () => import('./authentication/verify/verify.component').then(m => m.VerifyComponent) } ,
      
      ...authen // Include other authentication routes from auth.route.ts
    ]
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '', component: MainLayoutComponent, children: content },
  { path: 'support', component: SupportSystemComponent, children: support },
  // Translation demo route
  { path: 'i18n-demo', component: TranslationDemoComponent },
  // Auth debug route
  { path: 'auth-debug', component: AuthDebugComponent },
  // Add a fallback route for 404 errors
  { path: '**', redirectTo: 'auth/login' }
];