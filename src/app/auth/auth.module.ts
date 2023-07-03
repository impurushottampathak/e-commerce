import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAuthComponent } from './admin-auth/admin-auth.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdminAuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    AdminAuthComponent
  ]
})
export class AuthModule { }
