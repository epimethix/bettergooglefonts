import { TestBed } from '@angular/core/testing';

import { MongofontService } from './mongofont.service';

describe('MongofontService', () => {
  let service: MongofontService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MongofontService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
