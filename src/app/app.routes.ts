import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { ListPageComponent } from './list-page/list-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { UserPageComponent } from './user-page/user-page.component';

export const routes: Routes = [
    { path: '', component: MainPageComponent },
    { path: 'products', component: ListPageComponent },
    { path: 'products/:id', component: DetailPageComponent },
    { path: 'dashboard', component: UserPageComponent }
  ];
