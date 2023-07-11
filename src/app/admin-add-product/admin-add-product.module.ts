import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAddProductComponent } from './admin-add-product/admin-add-product.component';
import { FormsModule } from '@angular/forms';
import { UpdateProductComponent } from './update-product/update-product.component';



@NgModule({
  declarations: [
    AdminAddProductComponent,
    UpdateProductComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    AdminAddProductComponent
  ]
})
export class AdminAddProductModule { }
