import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import { Accommodation } from './accommodation.class';
import { HttpHelper } from '../shared/helpers/http.helper';
import { EventEmitter } from '@angular/core/src/event_emitter';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AccommodationService {

public onAddAccomodation: Subject<Accommodation>;

  // TODO: Replace HTTP with AuthHttp
  constructor(protected http: Http) {
    this.onAddAccomodation = new Subject<Accommodation>();
  }

  /**
    * Gets all the accommodations
    */
  public getAll(): Observable<Accommodation[]> {
    return this.http.get(`${environment.apiUrl}/accommodations`, HttpHelper.getRequestOptions())
      .map(r => r.json())
      .flatMap(r => r)
      .map(r => new Accommodation(r))
      .toArray();
  }

  /**
  *Add a new accomodation
  */
  public createAccomodation(accommodation: Accommodation): Observable<Accommodation> {
    return this.http.post(`${environment}/accommodations`, accommodation)
    .map(r => r.json())
    .map(r => new Accommodation(r));
  }

}
