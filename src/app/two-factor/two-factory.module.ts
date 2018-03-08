import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from '../alert/alert.module';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { TwoFactorComponent } from './two-factor.component';
import { TwoFacorRoutingModule } from './two-factor-routing.module';
import { TwoFactorService } from './twofactor.service';

@NgModule({
  declarations: [
    TwoFactorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    AlertModule,
    TwoFacorRoutingModule
  ],
  providers: [
      AuthService,
      TwoFactorService
  ],
  exports: []
})
export class TwoFactorModule { }
