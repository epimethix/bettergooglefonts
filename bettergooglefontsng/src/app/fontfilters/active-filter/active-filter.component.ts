import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { AFilter } from '../fontfilters.component';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-active-filter',
  standalone: true,
  imports: [MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatIconModule, NgComponentOutlet, MatSliderModule],
  templateUrl: './active-filter.component.html',
  styleUrl: './active-filter.component.scss'
})
export class ActiveSelectFilterComponent implements AfterViewInit {

  @Input('formcontrol')
  fc!: FormControl

  @Input()
  filter!: AFilter;

  @Output()
  remove = new EventEmitter()

  @ViewChild('daSelect')
  daSelect!: MatSelect

  ngAfterViewInit() {
    if (this.daSelect) {
      this.daSelect.open()
      this.daSelect.focus()
    }
    this.fc.valueChanges.subscribe(console.log)
  }

}
