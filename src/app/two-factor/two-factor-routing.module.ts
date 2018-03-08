import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { TwoFactorComponent } from './two-factor.component';

const routes: Routes = [
  {
    path: 'tfa', component: TwoFactorComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TwoFacorRoutingModule { }
