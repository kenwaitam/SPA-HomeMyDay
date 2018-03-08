import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { TwoFactor } from './twofactor.class';
import { HttpHelper } from '../shared/helpers/http.helper';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class TwoFactorService {

    constructor(protected authHttp: AuthHttp) {}

    public setup() {
        return this.authHttp.post(
            `${environment.apiUrl}authentication/twofactor/setup`, HttpHelper.getRequestOptions()
        ).map(r => r.json());
    }

    public disable() {
        return this.authHttp.delete(
            `${environment.apiUrl}authentication/twofactor/setup`, HttpHelper.getRequestOptions()
        ).map(r => r.json());
    }

    public confirm(tfaToken: string) {
        return this.authHttp.post(
            `${environment.apiUrl}authentication/twofactor/verify`, { token: tfaToken }, HttpHelper.getRequestOptions()
        ).map(r => r.json());
    }

    public getTwoFactor(): Observable<TwoFactor> {
        return this.authHttp.get(
            `${environment.apiUrl}authentication/twofactor/setup`, HttpHelper.getRequestOptions()
        ).map(r => r.json());
    }
}
