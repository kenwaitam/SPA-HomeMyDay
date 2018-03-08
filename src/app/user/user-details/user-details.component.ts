import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { IUserToken } from '../../shared/interfaces/iusertoken.interface';
import { Router } from '@angular/router';
import { TwoFactor } from '../../two-factor/twofactor.class';
import { TwoFactorService } from '../../two-factor/twofactor.service';
import { AlertService } from '../../alert/alert.service';

@Component({
  selector: 'app-user-details',
  templateUrl: 'user-details.component.html'
})
export class UserDetailsComponent implements OnInit {

  public user: IUserToken;
  public tfa: boolean;
  public twofactor: TwoFactor;

  constructor(private authService: AuthService, private router: Router,
    private tfaService: TwoFactorService,
    private alertService: AlertService) {
  }

  ngOnInit() {
    this.user = this.authService.getUserInfo();

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

    if (!this.user) {
      this.router.navigateByUrl('/login');
    }
  }

  public setup() {
    this.tfaService.setup().subscribe((tfa) => {
      this.alertService.showSuccess('TFA Enabled');
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
