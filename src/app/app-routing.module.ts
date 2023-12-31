import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { AdminAuthComponent } from './auth/admin-auth/admin-auth.component';
import { AdminHomeComponent } from './home/admin-home/admin-home.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminAddProductComponent } from './admin-add-product/admin-add-product/admin-add-product.component';
import { UpdateProductComponent } from './admin-add-product/update-product/update-product.component';
import { SearchpageComponent } from './header/searchpage/searchpage.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { UserAuthComponent } from './auth/user-auth/user-auth.component';

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
    path: 'user-auth',
    component: UserAuthComponent
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
  },  
  {
    path: 'search/:query',
    component:SearchpageComponent,
  }
  ,  
  {
    path: 'details/:productid',
    component:ProductDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
