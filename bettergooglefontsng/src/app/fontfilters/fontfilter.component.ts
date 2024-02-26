import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-fontfilter',
    template: `<div>
        {{axisTag}}
        <mat-slider min="min" max="max">
    <input matSliderStartThumb>
     <input matSliderEndThumb>
    
    </mat-slider>
    </div>
  `,
})
export class FontfilterComponent {

    @Input()
    axisTag = ''
    @Input()
    min: number | undefined
    @Input()
    max: number | undefined


}
