import { Routes } from '@angular/router';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { BlogPageComponent } from './Components/blog-page/blog-page.component';
import { LayoutComponent } from './Components/layout/layout.component';

export const routes: Routes = [
  {
    //Default route
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    //login Route
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    // canActivate: [authGuard],
    children: [
      {
        path: 'blog',
        component: BlogPageComponent,
      },
      {
        path: 'layout',
        component: LayoutComponent,
      },
    ],
  },
];
