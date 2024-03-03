import { AfterViewInit, Component, Input, OnInit, Query, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { Toggle } from '../fontfilters.component';

@Component({
  selector: 'app-active-filter',
  standalone: true,
  imports: [MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './active-filter.component.html',
  styleUrl: './active-filter.component.scss'
})
export class ActiveFilterComponent implements AfterViewInit {
   
  @Input('formcontrol')
  fc!: FormControl
  @ViewChild('daSelect')
  daSelect!: MatSelect
  ngAfterViewInit() {
    // child is set
    console.log(this.daSelect)
    this.daSelect.open()
    this.daSelect.focus()
  }
  @Input()
  toggle!: Toggle;

}
