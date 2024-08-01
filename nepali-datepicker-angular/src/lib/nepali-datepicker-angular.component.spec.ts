import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NepaliDatepickerComponent } from './nepali-datepicker-angular.component';

describe('NepaliDatepickerComponent', () => {
  let component: NepaliDatepickerComponent;
  let fixture: ComponentFixture<NepaliDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NepaliDatepickerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NepaliDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
