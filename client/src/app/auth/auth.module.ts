import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SignupComponent, SigninComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
})
export class AuthModule {}
