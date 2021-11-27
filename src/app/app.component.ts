import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {Observable, of} from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Learning App';
  selectedPerson!: Person;
  persons: Person[] = [{
    "id": 1,
    "name": "Rashid Ahmad"
  }, {
    "id": 2,
    "name": "Waseem Akram"
  }];
  fruits: string[] = ["Mango", "Grapes", "Apples", "Figs", "Dates"];

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;
  filteredPersons!: Observable<Person[]>;

  //variables for chip list
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

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
    if (value && typeof(value) === 'string') {
      const filterValue = value.toLowerCase();
      return this.persons.filter(person => person.name.toLowerCase().includes(filterValue));
    } else {
      return this.persons;
    }
  }

  addFruit(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.fruits.push(value);
    }
    event.chipInput!.clear();
  }

  removeFruit(fruit: string) : void {
    const index = this.fruits.indexOf(fruit);

    if (index != -1) {
      this.fruits.splice(index, 1);
    }
  }

  updatePerson(e: any) {
    if (e.option && e.option.value) {
      this.selectedPerson = e.option.value;
    }
  }

  displayFn(person: Person): string {
    return person && person.name ? person.name : '';
  }

  printSelected() {

  }
}

export default interface Person {
  id: number;
  name: string;
}


