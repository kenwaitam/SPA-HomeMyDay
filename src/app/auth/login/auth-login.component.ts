import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, NgModel } from '@angular/forms';
import { AuthService } from '../auth.service';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { LoginModel } from './loginmodel.class';
import { AlertService } from '../../alert/alert.service';
// import * as Moment from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html'
})
export class AuthLoginComponent extends BaseComponent {

  public loading = false;
  public loginModel: LoginModel;

  private form: NgForm;

  constructor(private alertService: AlertService, private authService: AuthService, private router: Router) {
    super();
    this.loginModel = new LoginModel();
  }

  onSubmit(form: NgForm) {
    this.loading = true;

    this.subscription = this.authService.login(this.loginModel.email, this.loginModel.password)
      .subscribe((loggedin) => {
        this.loading = false;

        this.alertService.showSuccess('Successfully logged in.');
        this.router.navigateByUrl('/');
      }, error => {
        this.loading = false;
        if (error.status = 429) {
          this.alertService.showError(error.statusText + ' Please try again in: ' +
            moment(error.json().error.nextValidRequestDate).fromNow());
        } else {
          this.alertService.showError('An error has occurred while trying to login.' + error.statusText);
        }
      });
  }
}
