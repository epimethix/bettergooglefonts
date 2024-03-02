import { Component, OnInit } from '@angular/core';
import { FontNameUrl } from '../FontNameUrl';
import { FontFilter, MongofontService } from '../mongofont.service';
import { Observable } from 'rxjs';
import { FilterSelection } from '../fontfilters/fontfilters.component';

@Component({
  selector: 'app-fontoverview',
  templateUrl: './fontoverview.component.html',
  styleUrls: ['./fontoverview.component.scss']
})
export class FontoverviewComponent {

  fonts: Observable<FontNameUrl[]>
  constructor(private fontService: MongofontService) {
    this.fonts = this.fontService.getFonts()
  }

  trackFilterChange(event: FilterSelection) {
    this.fonts = this.fontService.getFonts(event)
  }
}
