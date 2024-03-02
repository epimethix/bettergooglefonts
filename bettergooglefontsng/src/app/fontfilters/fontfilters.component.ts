import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClassificationService, fontParamsSans } from '../classification.service';

type Axis = {
  tag: string
  min_value: number
  max_value: number
}

export type FilterSelection = {
  toggles
  ranges
}
@Component({
  selector: 'app-fontfilters',
  templateUrl: './fontfilters.component.html',
  styleUrls: ['./fontfilters.component.scss']
})


export class FontfiltersComponent implements OnInit {
  axes: Axis[] = []
  toggles: { title: string, items: string[] }[] = []
  _fc: { [k: string]: FormControl } = {};

  @Output()
  selectionChange = new EventEmitter<FilterSelection>
  fg: FormGroup<{ [k: string]: FormControl<any>; }>;

  constructor(private http: HttpClient, private classifier: ClassificationService) {
    this.toggles = classifier.getQuestions()

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
}

function mapFormEvent(values: Partial<{ [x: string]: any; }>): FilterSelection {
  const out = { toggles: {}, ranges: {} }
  for (const [k, v] of Object.entries(values)) {
    if (v && v.length) { out.toggles[k] = v }
  }
  return out
}

