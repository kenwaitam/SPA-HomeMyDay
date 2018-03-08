import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert/alert.service';
import { AuthService } from '../auth/auth.service';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import { HttpHelper } from '../shared/helpers/http.helper';
import { Observable } from 'rxjs/Observable';
import { TwoFactor } from './twofactor.class';
import { TwoFactorService } from './twofactor.service';

@Component({
  selector: 'app-two-factor',
  templateUrl: 'two-factor.component.html',
  styles: []
})

export class TwoFactorComponent implements OnInit {

  public twofactor: TwoFactor;
  public tfa: boolean;
  public tfaToken: string;

  constructor(private alertService: AlertService,
    private authService: AuthService,
    protected authHttp: AuthHttp,
    private tfaService: TwoFactorService) { }

  ngOnInit() {
    this.getTwoFactor();
  }

  public setup() {
    this.tfaService.setup().subscribe((tfa) => {
      this.getTwoFactor();
      this.twofactor = tfa;
    },
      error => {
        this.alertService.showError('Error setup TFA');
      });
  }

  public disable() {
    this.tfaService.disable().subscribe(() => {
      this.tfa = false;
      this.getTwoFactor();
      this.alertService.showSuccess('TFA Disabled');
    },
      error => {
        this.alertService.showError('Error disableing TFA');
      });
  }

  public confirm() {
    this.tfaService.confirm(this.tfaToken).subscribe(() => {
      this.tfaToken = '';
      this.getTwoFactor();
      this.alertService.showSuccess('TFA Confirmed');
    },
      error => {
        this.alertService.showError('Error confirming TFA');
      });
  }

  private getTwoFactor() {
    this.tfaService.getTwoFactor().subscribe((tfa) => {
      if (tfa) {
        this.twofactor = tfa;
        this.tfa = true;
      } else {
        console.log('False');
        this.tfa = false;
      }
    },
      error => {
         // this.alertService.showError('Error loading TwoFactor Authentication');
      });
  }
}
