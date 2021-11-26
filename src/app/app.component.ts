import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Learning App';
  persons: Person[] = [{
    "id": 1,
    "name": "Rashid Ahmad"
  }, {
    "id": 2,
    "name": "Waseem Akram"
  }];

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;
  filteredPersons!: Observable<Person[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

    this.filteredPersons = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterPersons(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private filterPersons(value: string) {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.persons.filter(person => person.name.toLowerCase().includes(filterValue));
    } else {
      return this.persons;
    }
    
  }

  displayFn(person: Person): string {
    return person && person.name ? person.name : '';
  }
}

export default interface Person {
  id: number;
  name: string;
}


