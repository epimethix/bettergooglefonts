import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FontoverviewComponent } from './fontoverview.component';

describe('FontoverviewComponent', () => {
  let component: FontoverviewComponent;
  let fixture: ComponentFixture<FontoverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [FontoverviewComponent]
});
    fixture = TestBed.createComponent(FontoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
