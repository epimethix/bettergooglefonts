import { JsonPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { PortalModule } from '@angular/cdk/portal'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FlexibleConnectedPositionStrategy, FullscreenOverlayContainer, Overlay, OverlayContainer, OverlayModule } from '@angular/cdk/overlay'

@Component({
  selector: 'app-searchable-filterlist',
  standalone: true,
  imports: [JsonPipe, FormsModule,
    ReactiveFormsModule, MatIconModule, OverlayModule, PortalModule],
  templateUrl: './searchable-filterlist.component.html',
  providers: [{ provide: OverlayContainer, useClass: FullscreenOverlayContainer }]

})
export class SearchableFilterlistComponent implements OnInit {

  @Input()
  availableFilters: { name: string, caption: string, icon?: string }[] = []

  @Output()
  activate = new EventEmitter<string>()

  @ViewChild('trigger', { read: ElementRef })

  protected selectedFilter = new FormControl<string>('')
  protected isOpen = false

  private readonly overlayBuilder = inject(Overlay);

  toggle() {
    this.isOpen = !this.isOpen
  }

  ngOnInit(): void {
    this.selectedFilter.valueChanges
      .subscribe(value => {
        if (value) {
          this.activate.next(value)
          this.selectedFilter.setValue(null)
        }
      })
  }

  createStrat(el) {
    return this.overlayBuilder.position()
      .flexibleConnectedTo(el.elementRef)
      .withFlexibleDimensions(true)
      .withGrowAfterOpen(true)
      .withLockedPosition(false)
      .withPositions([
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top'
        },
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top'
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top'
        }
      ])
      
      
  }

  createScrollStrat() {
    return this.overlayBuilder.scrollStrategies.block()
  }

  select(value) {
    this.activate.next(value)
    this.isOpen = false
  }

}
