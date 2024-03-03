import { Component, OnInit } from '@angular/core';
import { FontNameUrl } from '../FontNameUrl';
import { FontFilter, MongofontService } from '../mongofont.service';
import { Observable } from 'rxjs';
import { FilterSelection, FontfiltersComponent } from '../fontfilters/fontfilters.component';
import { FontpreviewComponent } from '../fontpreview/fontpreview.component';
import { NgFor, AsyncPipe } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
    selector: 'app-fontoverview',
    templateUrl: './fontoverview.component.html',
    styleUrls: ['./fontoverview.component.scss'],
    standalone: true,
    imports: [FontfiltersComponent, NgFor, FontpreviewComponent, AsyncPipe, ScrollingModule]
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
