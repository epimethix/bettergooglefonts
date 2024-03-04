import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchableFilterlistComponent } from './searchable-filterlist.component';

describe('SearchableFilterlistComponent', () => {
  let component: SearchableFilterlistComponent;
  let fixture: ComponentFixture<SearchableFilterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchableFilterlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchableFilterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
