import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, NgModel } from '@angular/forms';
import { AuthService } from '../auth.service';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { LoginModel } from './loginmodel.class';
import { AlertService } from '../../alert/alert.service';
// import * as Moment from 'moment';
import * as moment from 'moment';
import { TwoFactorService } from '../../two-factor/twofactor.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html'
})
export class AuthLoginComponent extends BaseComponent {

  public loading = false;
  public loginModel: LoginModel;
  public tfaToken: string;

  private form: NgForm;

  constructor(private alertService: AlertService, private authService: AuthService, private router: Router, private tfaService: TwoFactorService) {
    super();
    this.loginModel = new LoginModel();
  }

  onSubmit(form: NgForm) {
    this.loading = true;

    this.subscription = this.authService.login(this.loginModel.email, this.loginModel.password, this.tfaToken)
      .subscribe((loggedin) => {
        this.loading = false;
        this.tfaToken = '';
        this.alertService.showSuccess('Successfully logged in.');
        this.router.navigateByUrl('/');
      }, error => {
        this.loading = false;
        if (error.status === 429 && error.statusText === 'Too Many Requests') {
          this.alertService.showError(error.json().message);
        } else {
            this.alertService.showError('An error has occurred while trying to login. ' + error.statusText);
        }
      });
  }
}
