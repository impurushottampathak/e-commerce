import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { AdminAuthComponent } from './auth/admin-auth/admin-auth.component';
import { AdminHomeComponent } from './home/admin-home/admin-home.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminAddProductComponent } from './admin-add-product/admin-add-product/admin-add-product.component';
import { UpdateProductComponent } from './admin-add-product/update-product/update-product.component';

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
  {
    path: 'admin-add-product',
    component:AdminAddProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin-update-product/:id', // This /:id is used to determine dynamic routing of the product
    component:UpdateProductComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
