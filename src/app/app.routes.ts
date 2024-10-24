import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/features/auth.routes')
  },
  {
    path: 'formularios',
    loadChildren: () => import('./formularios/formularios.routes')
  },
  {
    path: '',
    redirectTo: 'formularios/empleados',
    pathMatch: 'full'  // Redireccionamos a empleados por defecto
  },
  {
    path: '',
    redirectTo: 'formularios/resistencias2',
    pathMatch: 'full'  // Redireccionamos a empleados por defecto
  }
];
