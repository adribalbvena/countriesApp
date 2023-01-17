import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  //httpClient is rxjs based
  constructor( private http: HttpClient ) { }

  //Observable is a generic
  searchCountry( term : string ): Observable<any> {

    const url = `${ this.apiUrl }/name/${ term }`;

    return this.http.get( url );
  }
}
