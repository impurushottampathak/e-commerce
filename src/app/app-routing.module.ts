import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { AdminAuthComponent } from './auth/admin-auth/admin-auth.component';
import { AdminHomeComponent } from './home/admin-home/admin-home.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'admin-auth',
    component: AdminAuthComponent
  },
  {
    path: 'admin-home',
    component: AdminHomeComponent,
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
