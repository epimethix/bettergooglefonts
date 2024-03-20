import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { SearchableFilterlistComponent } from '../searchable-filterlist/searchable-filterlist.component';
import { SelectFilterComponent } from '../select-filter/select-filter.component';

@Component({
  selector: 'app-range-filter',
  standalone: true,
  imports: [NgFor, MatFormFieldModule, MatIconModule, MatSliderModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatOptionModule, SearchableFilterlistComponent, SelectFilterComponent, MatCardModule],
  templateUrl: './range-filter.component.html',
  styleUrl: './range-filter.component.scss'
})
export class RangeFilterComponent {
  @Input()
  filter

  @Input()
  fg!: FormGroup

}
