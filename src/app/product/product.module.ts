import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule
  ],
  exports: [
    ProductDetailsComponent
  ]
})
export class ProductModule { }
