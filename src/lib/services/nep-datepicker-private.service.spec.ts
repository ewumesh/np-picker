import { TestBed } from '@angular/core/testing';

import { NepaliDatepickerAngularPrivateService } from './nep-datepicker-private.service';

describe('NepaliDatepickerAngularPrivateService', () => {
  let service: NepaliDatepickerAngularPrivateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NepaliDatepickerAngularPrivateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
