// import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ViewChild, ElementRef } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';

// AutoComplete
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

//  Badges
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

//! Buttons
import { MatDividerModule } from '@angular/material/divider';

//? Button Toggle
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

//! Configurable Check box
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

//? Chips
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { computed, inject, model } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';

//! Expansion Panel
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';

//? Grid Layout
import { MatGridListModule } from '@angular/material/grid-list';

//! Icon
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

//? List
import { FormGroup } from '@angular/forms';
import { MatListModule } from '@angular/material/list';

//! List - 2
import { DatePipe } from '@angular/common';

//? Paginator
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { JsonPipe } from '@angular/common';

export interface Section {
  name: string;
  updated: Date;
}

interface Shoes {
  value: string;
  name: string;
}

// Grid layout

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

// Icon
const THUMBUP_ICON = `
   <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
             2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 
             3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 
             3.78-3.4 6.86-8.55 11.54L12 21.35z" 
          fill="currentColor"/>
  </svg>
`;

export interface State {
  flag: string;
  name: string;
  population: string;
}

@Component({
  selector: 'app-angular-component',
  standalone: true,
  imports: [
    JsonPipe,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    AsyncPipe,
    MatBadgeModule,
    MatIconModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    FormsModule,
    MatRadioModule,
    MatChipsModule,
    MatAutocompleteModule,
    FormsModule,
    MatExpansionModule,
    MatInputModule,
    MatDatepickerModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    DatePipe,
    MatMenuModule,
    MatPaginatorModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './angular-component.component.html',
  styleUrls: ['./angular-component.component.css'],
})
export class AngularComponentComponent {
  // Auto complete
  stateCtrl = new FormControl('');
  filteredStates: Observable<State[]>;

  states: State[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg',
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg',
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg',
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg',
    },
  ];

  constructor() {
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map((state) => (state ? this._filterStates(state) : this.states.slice()))
    );

    //! Icon
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);

    // Note that we provide the icon here as a string literal here due to a limitation in
    // Stackblitz. If you want to provide the icon from a URL, you can use:
    // `iconRegistry.addSvgIcon('thumbs-up', sanitizer.bypassSecurityTrustResourceUrl('icon.svg'));`
    iconRegistry.addSvgIconLiteral(
      'thumbs-up',
      sanitizer.bypassSecurityTrustHtml(THUMBUP_ICON)
    );

    //? List
    this.form = new FormGroup({
      clothes: this.shoesControl,
    });
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter((state) =>
      state.name.toLowerCase().includes(filterValue)
    );
  }

  // Badges
  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  // Configurable Check box
  readonly checked = signal(false);
  readonly indeterminate = signal(false);
  readonly labelPosition = signal<'before' | 'after'>('after');
  readonly disabled = signal(false);

  // Chips
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly currentFruit = model('');
  readonly fruits = signal(['Lemon']);
  readonly allFruits: string[] = [
    'Apple',
    'Lemon',
    'Lime',
    'Orange',
    'Strawberry',
  ];
  readonly filteredFruits = computed(() => {
    const currentFruit = this.currentFruit().toLowerCase();
    return currentFruit
      ? this.allFruits.filter((fruit) =>
          fruit.toLowerCase().includes(currentFruit)
        )
      : this.allFruits.slice();
  });

  readonly announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.update((fruits) => [...fruits, value]);
    }

    // Clear the input value
    this.currentFruit.set('');
  }

  remove(fruit: string): void {
    this.fruits.update((fruits) => {
      const index = fruits.indexOf(fruit);
      if (index < 0) {
        return fruits;
      }

      fruits.splice(index, 1);
      this.announcer.announce(`Removed ${fruit}`);
      return [...fruits];
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.update((fruits) => [...fruits, event.option.viewValue]);
    this.currentFruit.set('');
    event.option.deselect();
  }

  //! Expansion pannel
  readonly panelOpenState = signal(false);

  //! Grid Layout
  tiles: Tile[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];

  //! List selections
  form: FormGroup;
  shoes: Shoes[] = [
    { value: 'boots', name: 'Boots' },
    { value: 'clogs', name: 'Clogs' },
    { value: 'loafers', name: 'Loafers' },
    { value: 'moccasins', name: 'Moccasins' },
    { value: 'sneakers', name: 'Sneakers' },
  ];
  shoesControl = new FormControl();

  //! List - 2
  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
  ];
  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    },
  ];

  //! Paginator
 
}
