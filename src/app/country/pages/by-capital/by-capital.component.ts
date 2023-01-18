import { Component } from '@angular/core';
import { Country } from '../../interfaces/country-interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital',
  templateUrl: './by-capital.component.html',
  styles: [
  ]
})
export class ByCapitalComponent {

  term: string = 'Hello world';
  isError: boolean = false;
  countries: Country[] = [];

  constructor( private countryService: CountryService ) {}

  search( term: string ) {
    this.isError = false;
    this.term = term;

    this.countryService.searchCapital( term )
      .subscribe( (countries) => {
        console.log(countries);
        this.countries = countries;

      }, (err) => {
        this.isError = true;
        this.countries = [];
      });
  }

}
