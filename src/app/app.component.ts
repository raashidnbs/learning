import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {Observable, of} from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

export interface Person {
  id: number;
  name: string;
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

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
  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;

  myControl = new FormControl();
  fruitCtrl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;
  filteredPersons!: Observable<Person[]>;
  filteredFruits!: Observable<string[]>;

  //variables for chip list
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  
  ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = this.ELEMENT_DATA;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

    this.filteredPersons = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterPersons(value))
    );

    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterFruits(value))
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

  private filterFruits(value: string) {
    if (value) {
      const filteredValue = value.toLowerCase();
      return this.fruits.filter(f => f.toLowerCase().includes(filteredValue));
    } else {
      return this.fruits;
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

  fruitSelected(e: MatAutocompleteSelectedEvent): void {
    var newValue = e.option.viewValue;
    if (newValue) {
      if (!this.fruits.includes(newValue)) {
        this.fruits.push(newValue);
      }
    }
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
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

