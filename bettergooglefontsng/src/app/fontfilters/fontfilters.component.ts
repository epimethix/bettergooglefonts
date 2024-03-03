import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassificationService, fontParamsSans } from '../classification.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AxisFontfilterComponent } from './axisfontfilter.component';
import { NgFor } from '@angular/common';
import { SearchableFilterlistComponent } from "./searchable-filterlist/searchable-filterlist.component";
import { ActiveFilterComponent } from "./active-filter/active-filter.component";

type Axis = {
  tag: string
  min_value: number
  max_value: number
}

export type FilterSelection = {
  toggles
  ranges
}

export type Toggle = {
  title: string;
  items: string[];
};


@Component({
    selector: 'app-fontfilters',
    templateUrl: './fontfilters.component.html',
    styleUrls: ['./fontfilters.component.scss'],
    standalone: true,
    imports: [NgFor, AxisFontfilterComponent, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatOptionModule, SearchableFilterlistComponent, ActiveFilterComponent]
})


export class FontfiltersComponent implements OnInit {
  axes: Axis[] = []
  toggles: Toggle[] = []
  _fc: { [k: string]: FormControl } = {};

  @Output()
  selectionChange = new EventEmitter<FilterSelection>
  fg: FormGroup<{ [k: string]: FormControl<any>; }>;
  availableToggles: { name: string }[];
  // maybe rather a function and just a string for the selection
  selectedToggles: Toggle[] = []

  constructor(private http: HttpClient, private classifier: ClassificationService) {
    this.toggles = classifier.getQuestions()
    this.availableToggles = this.toggles.map(t => ({ name: t.title }))

    for (let toggle of this.toggles) {
      this._fc[toggle.title] = new FormControl()
    }
    this.fg = new FormGroup(this._fc)

  }
  ngOnInit(): void {
    this.http.get('/assets/axesmeta.json').subscribe(
      a => this.axes = (a as Axis[]).filter(a => a.tag.toLowerCase() === a.tag)
    )
    this.fg.valueChanges.subscribe(v => this.selectionChange.emit(mapFormEvent(v)))
  }

  selectFilter(value: string) {
    const toggle = this.toggles.find(v => v.title === value)
    if (toggle) {
      this.selectedToggles.push(toggle)
    }
  }
}

function mapFormEvent(values: Partial<{ [x: string]: any; }>): FilterSelection {
  const out = { toggles: {}, ranges: {} }
  for (const [k, v] of Object.entries(values)) {
    if (v && v.length) { out.toggles[k] = v }
  }
  return out
}

