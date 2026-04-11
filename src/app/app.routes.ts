import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'page-not-found',
    loadComponent: () =>
      import('./pages/page-not-found/page-not-found.component').then(
        (m) => m.PageNotFoundComponent,
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup/signup.component').then((m) => m.SignupComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/projects/projects.component').then(
        (m) => m.ProjectsComponent,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'project/:id',
    loadComponent: () =>
      import('./pages/projects/project/project.component').then(
        (m) => m.ProjectComponent,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'ticket/:id',
    loadComponent: () =>
      import('./pages/ticket/ticket.component').then((m) => m.TicketComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'my-tasks',
    loadComponent: () =>
      import('./pages/my-tasks/my-tasks.component').then(
        (m) => m.MyTasksComponent,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'reports',
    loadComponent: () =>
      import('./pages/reports/reports.component').then(
        (m) => m.ReportsComponent,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/settings/settings.component').then(
        (m) => m.SettingsComponent,
      ),
    canActivate: [AuthGuard],
  },
];
