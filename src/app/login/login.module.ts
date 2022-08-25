import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    IonicModule,
    LoginRoutingModule,
    CommonModule
  ],
  exports:[LoginComponent]
})
export class LoginModule { }
