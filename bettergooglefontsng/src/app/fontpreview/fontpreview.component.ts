import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { appendStyleTag, FontNameUrl, generateFontCss } from '../FontNameUrl';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-fontpreview',
    templateUrl: './fontpreview.component.html',
    styleUrls: ['./fontpreview.component.scss'],
    standalone: true,
    imports: [NgFor]
})
export class FontpreviewComponent implements OnChanges {

  @Input()
  font: FontNameUrl = { name: '', url: '', axes: [] }

  ngOnChanges(changes: SimpleChanges): void {
    const css = generateFontCss(this.font)
    appendStyleTag(css);
  }

}

