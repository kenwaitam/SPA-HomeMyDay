import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptionsArgs } from '@angular/http';
import { Accommodation } from './accommodation.class';
import { HttpHelper } from '../shared/helpers/http.helper';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class AccommodationService {
  constructor(protected authHttp: AuthHttp) {
  }

  /**
    * Gets all the accommodations
    */
  public getAll(): Observable<Accommodation[]> {
    return this.authHttp.get(`${environment.apiUrl}/accommodations`, HttpHelper.getRequestOptions())
      .map(r => r.json())
      .flatMap(r => r)
      .map(r => new Accommodation(r))
      .toArray();
  }

  /**
    * Deletes an accommodation of the id
    * @param id The id of the accommodation
    */
  public delete(id: string) {
    return this.authHttp.delete(`${environment.apiUrl}/accommodations/${id}`, HttpHelper.getRequestOptions())
      .map(r => r.json());
  }
}
