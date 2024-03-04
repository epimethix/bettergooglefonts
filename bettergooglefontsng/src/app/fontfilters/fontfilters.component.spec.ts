import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FontfiltersComponent } from './fontfilters.component';

describe('FontfiltersComponent', () => {
  let component: FontfiltersComponent;
  let fixture: ComponentFixture<FontfiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [FontfiltersComponent]
});
    fixture = TestBed.createComponent(FontfiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
