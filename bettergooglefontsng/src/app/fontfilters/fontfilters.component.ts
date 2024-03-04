import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassificationService, fontParamsSans } from '../classification.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AxisFontfilterComponent } from './axisfontfilter.component';
import { NgFor } from '@angular/common';
import { SearchableFilterlistComponent } from "./searchable-filterlist/searchable-filterlist.component";
import { ActiveSelectFilterComponent } from "./active-filter/active-filter.component";
import { MatSliderModule } from '@angular/material/slider';

type Axis = {
  tag: string
  min_value: number
  max_value: number
}

export type FilterSelection = {
  toggles
  ranges
}

export type AFilter = {
  type: 'select' | 'range'
  title: string
  // TODO: two subclasses and factory
  items?: string[]
  min_value?: number
  max_value?: number
};


@Component({
  selector: 'app-fontfilters',
  templateUrl: './fontfilters.component.html',
  styleUrls: ['./fontfilters.component.scss'],
  standalone: true,
  imports: [NgFor, AxisFontfilterComponent, MatFormFieldModule, MatSliderModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatOptionModule, SearchableFilterlistComponent, ActiveSelectFilterComponent]
})


export class FontfiltersComponent implements OnInit {
  filters: AFilter[] = []
  _fc: { [k: string]: FormControl } = {};
  _fcg: { [k: string]: { min: FormControl, max: FormControl } } = {};

  @Output()
  selectionChange = new EventEmitter<FilterSelection>
  availableFilters: { name: string }[] = [];
  // maybe rather a function and just a string for the selection
  activeFilters: AFilter[] = []
  fg!: FormGroup<{ [x: string]: FormControl<any> | FormGroup<any>; }>;

  constructor(private http: HttpClient, private classifier: ClassificationService) {
    // TODO: filterservice (not using classifications directly)
    this.filters = classifier.getQuestions().map(q => ({ ...q, type: 'select' }))


  }
  ngOnInit(): void {
    this.http.get('/assets/axesmeta.json').subscribe(
      a => {
        const axes: AFilter[] = (a as Axis[])
          .filter(a => a.tag.toLowerCase() === a.tag)
          .map(a => ({
            title: a.tag,
            type: 'range',
            min_value: a.min_value,
            max_value: a.max_value
          }))
        this.filters.push(...axes)
        this.availableFilters = this.filters.map(t => ({ name: t.title }))
        // better on demand
        for (let filter of this.filters) {
          if (filter.type === 'range') {
            this._fcg[filter.title] = { min: new FormControl(), max: new FormControl() }
          } else if (filter.type === 'select') {
            this._fc[filter.title] = new FormControl()
          }
        }
        const rangeGroups = {}
        for (const [k, v] of Object.entries(this._fcg)) {
          rangeGroups[k] = new FormGroup(v)
        }
        this.fg = new FormGroup({ ...this._fc, ...rangeGroups })
        this.fg.valueChanges.subscribe(v => this.selectionChange.emit(mapFormEvent(v)))
      }
    )
  }

  activateFilter(value: string) {
    const filter = this.filters.find(v => v.title === value)
    if (filter) {
      this.activeFilters.push(filter)
    }
  }

  removeFilter(value: string) {
    const idx = this.activeFilters.findIndex(v => v.title === value)
    if (idx > -1) {
      this.activeFilters.splice(idx, 1)
      this._fc[value].setValue(undefined)
    }
  }
}

function mapFormEvent(values: Partial<{ [x: string]: any; }>): FilterSelection {
  const out = { toggles: {}, ranges: {} }
  for (const [k, v] of Object.entries(values)) {
    if (v && v.length) { out.toggles[k] = v }
    if (v && (v.max || v.min)) { out.ranges[k] = v }
  }
  return out
}

