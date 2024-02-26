import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FontpreviewComponent } from './fontpreview.component';

describe('FontpreviewComponent', () => {
  let component: FontpreviewComponent;
  let fixture: ComponentFixture<FontpreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FontpreviewComponent]
    });
    fixture = TestBed.createComponent(FontpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
