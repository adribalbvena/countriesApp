import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country-interface';

@Component({
  selector: 'app-show-country',
  templateUrl: './show-country.component.html',
  styles: [
  ]
})
export class ShowCountryComponent implements OnInit {
  country!: Country;

  //activated route comes with everything that we need to subscribe us to any url change
  constructor( 
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService
    ) {}

  ngOnInit(): void {

    this.activatedRoute.params //access to observable where the params are
      .pipe( //here we gonna put the operators that will be working with the product
        switchMap( ({ id }) => this.countryService.getCountryByCode( id ) ), //receives the value of the previous observable and return a new one
        tap( console.log ) //receives the product of the previous observable and print it in console
        )
      .subscribe( country => this.country = country[0] );
    // this.activatedRoute.params
    //   .subscribe( ({ id }) => {
    //     console.group( id );

    //     this.countryService.getCountryByCode( id )
    //     .subscribe( country => {
    //       console.log(country);
    //     });
    //   });
  }

}
