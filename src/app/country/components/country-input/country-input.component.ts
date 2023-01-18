import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-country-input',
  templateUrl: './country-input.component.html',
  styleUrls: []
})
export class CountryInputComponent implements OnInit {

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  //subject is an observable
  //debouncer is emmited when I stop to writing
  debouncer: Subject<string> = new Subject();

  term: string = '';
    
  //triggers just one time when the component is initialized
  ngOnInit() {
    this.debouncer
      .pipe(debounceTime(300))
      .subscribe( value => {
      this.onDebounce.emit( value );
    });
  }

  search() {
    this.onEnter.emit( this.term );
  }

  keyPressed( event: any ) {

    this.debouncer.next( this.term );

  }
}
