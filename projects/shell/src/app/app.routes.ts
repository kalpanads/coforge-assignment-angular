import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { authGuard } from './auth/auth.guard';
import { roleGuard } from './auth/role.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
   {
    path: 'dashboard',
    // canActivate: [authGuard, roleGuard(['admin'])],
    loadChildren: () =>
      import('projects/mfe-dashboard/src/app/app.routes').then(m => m.routes)
  },
   {
    path: 'users',
    canActivate: [authGuard, roleGuard(['admin'])],
    loadChildren: () =>
      import('projects/mfe-users/src/app/app.routes').then(m => m.routes)
  },
  { path: 'login', loadComponent: () => import('./auth/login.page').then(m => m.LoginPage) },
  { path: '**', loadComponent: () => import('./not-found.page').then(m => m.NotFoundPage) }
];
