import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import { Accommodation } from './accommodation.class';
import { HttpHelper } from '../shared/helpers/http.helper';

@Injectable()
export class AccommodationService {
  // TODO: Replace HTTP with AuthHttp
  constructor(protected http: Http) {
  }

  /**
    * Gets all the accommodations
    */
  public getAll(): Observable<Accommodation[]> {
    return this.http.get(`${environment.apiUrl}/accommodations`, HttpHelper.getRequestOptions())
      .map(r => r.json());
  }
}
