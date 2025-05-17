import { Routes } from '@angular/router';
import {PagesComponent} from './pages/pages/pages.component';

export const routes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  {path: 'pages', component: PagesComponent},
];
