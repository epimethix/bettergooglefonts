import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveSelectFilterComponent } from './active-filter.component';

describe('ActiveFilterComponent', () => {
  let component: ActiveSelectFilterComponent;
  let fixture: ComponentFixture<ActiveSelectFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveSelectFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActiveSelectFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
