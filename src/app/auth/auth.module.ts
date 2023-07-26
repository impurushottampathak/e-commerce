import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAuthComponent } from './admin-auth/admin-auth.component';
import { FormsModule } from '@angular/forms';
import { UserAuthComponent } from './user-auth/user-auth.component';



@NgModule({
  declarations: [
    AdminAuthComponent,
    UserAuthComponent
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
