import { Component, Input, OnInit } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';

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
    standalone: true,
    imports: [MatSliderModule],
})
export class AxisFontfilterComponent {

    @Input()
    axisTag = ''
    @Input()
    min: number | undefined
    @Input()
    max: number | undefined


}
