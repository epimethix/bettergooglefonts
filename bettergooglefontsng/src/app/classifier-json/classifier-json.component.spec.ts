import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassifierJsonComponent } from './classifier-json.component';

describe('ClassifierJsonComponent', () => {
  let component: ClassifierJsonComponent;
  let fixture: ComponentFixture<ClassifierJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassifierJsonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClassifierJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
