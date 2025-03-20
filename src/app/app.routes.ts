import { Routes } from '@angular/router';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { BlogPageComponent } from './Components/blog-page/blog-page.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { AboutComponent } from './Components/about/about.component';
import { authGuard } from './Guard/auth.guard';
import { WeatherappComponent } from './Components/weatherapp/weatherapp.component';
import { PersonalPageComponent } from './Components/personal-page/personal-page.component';
import { CalcComponent } from './Components/calc/calc.component';
import { CrudWithLocalStorageComponent } from './Components/crud-with-local-storage/crud-with-local-storage.component';
import { AngularComponentComponent } from './Components/Angular Components/angular-component.component';

export const routes: Routes = [
  {
    //Default route
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    //login Route
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'home',
    component: BlogPageComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'layout',
        component: LayoutComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'weather',
        component: WeatherappComponent,
      },
      {
        path: 'personal',
        component: PersonalPageComponent,
      },
      {
        path: 'calc',
        component: CalcComponent,
      },
      {
        path: 'crud-w-localstorage',
        component: CrudWithLocalStorageComponent,
      },
      {
        path: 'angular-components',
        component: AngularComponentComponent,
      },
    ],
  },
];
