import { TestBed } from '@angular/core/testing';

import { NepaliDatepickerService } from './nep-datepicker.service';

describe('NepaliDatepickerService', () => {
  let service: NepaliDatepickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NepaliDatepickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
