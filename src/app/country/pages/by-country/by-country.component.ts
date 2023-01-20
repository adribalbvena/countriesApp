import { Component } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country-interface';

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country.component.html',
  styles: [
    `
    li {
      cursos: pointer;
    }
    `
  ]
})
export class ByCountryComponent {

  term: string = 'Hello world';
  isError: boolean = false;
  countries: Country[] = [];
  suggestedCountries: Country[] = [];
  showSuggestions: boolean = false;

  constructor( private countryService: CountryService ) {}

  search( term: string ) {
    this.showSuggestions = false;
    this.isError = false;
    this.term = term;

    this.countryService.searchCountry( term )
      .subscribe( (countries) => {
        console.log(countries);
        this.countries = countries;

      }, (err) => {
        this.isError = true;
        this.countries = [];
      });
  }

  suggestions( term: string ) {
    this.isError = false;
    this.term = term;
    this.showSuggestions = true;
    //Create suggestions
    this.countryService.searchCountry( term )
      .subscribe( countries => this.suggestedCountries = countries.splice(0,4),
      (err) => this.suggestedCountries = [] 
      );
  }

  searchSuggested( term: string ) {
    this.search( term );
  }
}
