import {
  Component,
  EventEmitter,
  Input,
  HostListener,
  OnInit,
  Output,
  ViewEncapsulation,
  ElementRef,
  SimpleChanges,
  Optional,
  Inject,
  ViewChild,
  OnChanges,
  AfterViewInit,
} from '@angular/core';
import {
  ConfigType,
  DateObj,
  DaysMapping,
  MonthMapping,
} from './interface/interface';
import {
  CalendarFormat,
  daysMapping,
  monthsMapping,
  englishMonthMapping,
} from './constants/mapping';
import { NepaliDatepickerAngularPrivateService } from './services/nepali-datepicker-angular-private.service';
import { DatePipe } from '@angular/common';
import { englishLeapMonths, englishMonths } from './constants/data';
type DateFormatType = 'yyyy/mm/dd' | 'dd/mm/yyyy' | 'yyyy-mm-dd' | 'dd-mm-yyyy';
type Language = 'en' | 'ne';
type MonthDisplayType = 'default' | 'short';
type DateIn = 'AD' | 'BS';
@Component({
  selector: 'ne-datepicker',
  templateUrl: `nepali-datepicker-angular.component.html`,
  styleUrls: ['nepali-datepicker-angular.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NepaliDatepickerComponent
  implements OnInit, OnChanges, AfterViewInit
{
  @ViewChild('nepaliDatePicker') nepaliDatePicker!: ElementRef<HTMLDivElement>;
  @Input()
  primaryColor!: string;
  @Input()
  placeholder = 'Enter date';
  @Input()
  language: Language = 'ne';
  @Input() dateIn: DateIn = 'BS';
  @Input() isError = false;
  @Input() darkTheme = false;
  @Input() date!: string;
  @Input() appendTime = false;
  @Input() maxDate!: Date;
  @Input() minDate!: Date;
  @Input() dateFormat: DateFormatType = 'yyyy/mm/dd';
  @Input() monthDisplayType: MonthDisplayType = 'default';
  @Input() hasMultipleCalendarView = true;

  @Output() dateInAD: EventEmitter<string> = new EventEmitter();
  @Output() dateInBS: EventEmitter<string> = new EventEmitter();

  public nepaliDateToday: DateObj = { day: 0, month: 0, year: 0 };
  public englishDateToday: DateObj = { day: 0, month: 0, year: 0 };
  public currentNepaliDate: DateObj = { day: 0, month: 0, year: 0 };
  public englishCurrentDate: DateObj = { day: 0, month: 0, year: 0 };
  public nepaliMaxDate: DateObj = { day: 0, month: 0, year: 0 };
  public nepaliMinDate: DateObj = { day: 0, month: 0, year: 0 };
  public englishMaxDate: DateObj = { day: 0, month: 0, year: 0 };
  public englishMinDate: DateObj = { day: 0, month: 0, year: 0 };
  public selectedDate!: DateObj;
  public englishSelectedDate!: DateObj;
  public formattedDate = '';
  public years: number[] = [];
  public currentMonthData!: any;
  public daysMapping: DaysMapping = daysMapping;
  public monthsMapping: MonthMapping = monthsMapping;
  public isOpen = false;
  public calendarType = CalendarFormat.ne;
  public dayDisplayType: 'default' | 'short' = 'short';
  public calendarView: DateIn = 'BS';
  public selectedMonthIndex: number;
  public selectedYear: number;
  private alwaysVisible = false;
  private selectedTimeWithTimezone: any;
  private dateSeparatedCharacters = ['/', '-'];
  private currentDate: any;
  private rootPrimaryColor = '#1d49e7';

  private dateFormatter = (selectedDate: DateObj) => {
    const dd =
      selectedDate.day < 10 ? '0' + selectedDate.day : selectedDate.day;
    const mm =
      selectedDate.month < 9
        ? '0' + (selectedDate.month + 1)
        : selectedDate.month + 1;
    return `${this.selectedDate.year}/${mm}/${dd}`;
  };

  initialized: boolean = false;

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  constructor(
    public _nepaliDate: NepaliDatepickerAngularPrivateService,
    private eRef: ElementRef,
    private _datePipe: DatePipe,
    @Optional() @Inject('config') config: ConfigType
  ) {
    if (config && config.primaryColor) {
      this.rootPrimaryColor = config.primaryColor;
    }
    this.currentDate = new Date();
    this.setEnglishCurrentDate();
    this.setNepaliCurrentDate();
    this.nepaliDateToday = _nepaliDate.engToNepDate(
      this.currentDate.getDate(),
      this.currentDate.getMonth(),
      this.currentDate.getFullYear()
    );
    this.englishDateToday = {
      day: this.currentDate.getDate(),
      month: this.currentDate.getMonth(),
      year: this.currentDate.getFullYear(),
    };
    this.selectedMonthIndex = this.nepaliDateToday.month;
    this.selectedYear = this.nepaliDateToday.year;
  }

  ngOnInit() {
    this.setCurrentDate();
    this.populateYears();
    this.setCurrentMonthData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['date'] && this.date) {
      this.setInputDate();
    }
    if (changes['maxDate'] && this.maxDate) {
      this.setMaxDate();
    }
    if (changes['minDate'] && this.minDate) {
      this.setMinDate();
    }
    if (changes['language'] && this.language) {
      this.calendarType = CalendarFormat[this.language];
    }
    if (changes['primaryColor'] && this.primaryColor) {
      this.rootPrimaryColor = this.primaryColor;
      this.setDatepickerColor();
    }
  }

  ngAfterViewInit(): void {
    this.setDatepickerColor();
  }

  private setDatepickerColor() {
    if (this.nepaliDatePicker) {
      this.nepaliDatePicker.nativeElement.style.setProperty(
        '--ne-datepicker-primary-color',
        this.rootPrimaryColor
      );
    }
  }

  private setMaxDate() {
    this.setNepaliMaxDate();
    this.setEnglishMaxDate();
  }
  private setMinDate() {
    this.setNepaliMinDate();
    this.setEnglishMinDate();
  }

  private setInputDate() {
    if (this.dateIn === 'BS') {
      this.setCurrentNepaliDate(this.date);
    } else if (this.dateIn === 'AD') {
      const engDate = new Date(this.date);
      const nepaliDate = this._nepaliDate.engToNepDate(
        engDate.getDate(),
        engDate.getMonth(),
        engDate.getFullYear()
      );

      this.setCurrentNepaliDate(
        `${nepaliDate.year}/${nepaliDate.month + 1}/${nepaliDate.day}`
      );
    }
    if (this.calendarView === 'BS') {
      this.selectedMonthIndex = this.selectedDate.month;
      this.selectedYear = this.selectedDate.year;
    } else {
      this.selectedMonthIndex = new Date(this.date).getMonth();
      this.selectedYear = new Date(this.date).getFullYear();
    }
  }

  private setCurrentNepaliDate(date: string) {
    const fd = this.changeStructure(date);
    if (!fd) return;
    this.selectedDate = fd;
    this.currentNepaliDate = fd;
    this.formatValue();
    this.currentDate = this._nepaliDate.nepToEngDate(
      this.selectedDate.day,
      this.selectedDate.month,
      this.selectedDate.year
    );
    this.englishSelectedDate = {
      day: this.currentDate.getDate(),
      month: this.currentDate.getMonth(),
      year: this.currentDate.getFullYear(),
    };
    this.setEnglishCurrentDate();
    this.setCurrentMonthData();
  }

  private setNepaliMaxDate() {
    const maximumDate = new Date(this.maxDate);
    this.nepaliMaxDate = this._nepaliDate.engToNepDate(
      maximumDate.getDate(),
      maximumDate.getMonth(),
      maximumDate.getFullYear()
    );
  }

  public setNepaliMinDate() {
    const minimumDate = new Date(this.minDate);
    this.nepaliMinDate = this._nepaliDate.engToNepDate(
      minimumDate.getDate(),
      minimumDate.getMonth(),
      minimumDate.getFullYear()
    );
  }

  private setEnglishMinDate() {
    const minimumDate = new Date(this.minDate);
    this.englishMinDate = {
      day: minimumDate.getDate(),
      month: minimumDate.getMonth(),
      year: minimumDate.getFullYear(),
    };
  }
  private setEnglishMaxDate() {
    const maximumDate = new Date(this.maxDate);
    this.englishMaxDate = {
      day: maximumDate.getDate(),
      month: maximumDate.getMonth(),
      year: maximumDate.getFullYear(),
    };
  }

  private populateYears() {
    this.years = [];
    if (this.calendarView === 'BS') {
      for (let i = 2001; i <= 2099; i++) {
        this.years.push(i);
      }
    } else {
      for (let i = 1945; i < 2043; i++) {
        this.years.push(i);
      }
    }
  }
  public selectYear(e: any) {
    if (this.calendarView === 'BS') {
      this.currentNepaliDate.year = parseInt(e.target.value);
      this.currentDate = this._nepaliDate.nepToEngDate(
        this.currentNepaliDate.day,
        this.currentNepaliDate.month,
        this.currentNepaliDate.year
      );
    } else {
      this.englishCurrentDate.year = parseInt(e.target.value);
      this.currentDate = new Date(
        `${this.englishCurrentDate.year}/${this.englishCurrentDate.month + 1}/1`
      );
    }
    this.setEnglishCurrentDate();
    this.setCurrentMonthData();
  }

  public selectMonth(e: any) {
    let month = e.target.value;
    if (this.calendarView === 'BS') {
      this.currentNepaliDate.day = 1;
      let nep_month_index =
        this.monthsMapping[this.language][this.monthDisplayType]?.indexOf(
          month
        ) ?? 0;

      this.currentNepaliDate.month = nep_month_index;

      this.currentDate = this._nepaliDate.nepToEngDate(
        this.currentNepaliDate.day,
        this.currentNepaliDate.month,
        this.currentNepaliDate.year
      );
    } else {
      this.englishCurrentDate.day = 1;
      const monthIndex =
        englishMonthMapping[this.language][this.monthDisplayType]?.indexOf(
          month
        ) ?? 0;
      this.englishCurrentDate.month = monthIndex;
      this.currentDate = new Date(
        `${this.englishCurrentDate.year}/${this.englishCurrentDate.month + 1}/1`
      );
    }
    this.setEnglishCurrentDate();
    this.setCurrentMonthData();
  }

  private resetCurrentMonthData() {
    this.currentMonthData = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
    };
  }
  private formatValue() {
    if (this.selectedDate) {
      this.formattedDate = this.dateFormatter(this.selectedDate);
    }
  }

  private changeStructure(value: string) {
    let separatedCharacter;
    for (let i = 0; i < this.dateSeparatedCharacters.length; i++) {
      const character = this.dateSeparatedCharacters[i];
      if (value.indexOf(character) !== -1) {
        separatedCharacter = character;
        break;
      }
    }
    if (!separatedCharacter) return;
    const splittedDate = value.split(separatedCharacter);
    return {
      year: Number(splittedDate[0]),
      month: Number(splittedDate[1]) - 1,
      day: Number(splittedDate[2]),
    };
  }

  private setCurrentDate() {
    if (!this.selectedDate) {
      this.currentNepaliDate = this._nepaliDate.engToNepDate(
        this.currentDate.getDate(),
        this.currentDate.getMonth(),
        this.currentDate.getFullYear()
      );
      this.setEnglishCurrentDate();
    } else {
      const { day, month, year } = this.selectedDate;
      this.currentNepaliDate = { day, month, year };
      this.currentDate = this._nepaliDate.nepToEngDate(
        this.selectedDate.day,
        this.selectedDate.month,
        this.selectedDate.year
      );
      this.setEnglishCurrentDate();
    }
  }

  private setCurrentMonthData() {
    this.resetCurrentMonthData();
    if (this.calendarView === 'BS') {
      this.fillNepaliCalendar();
    } else {
      this.fillEnglishCalendar();
    }
    this.createEmptySpaces();
  }

  private fillNepaliCalendar() {
    const day = this._nepaliDate
      .nepToEngDate(
        this.currentNepaliDate.day,
        this.currentNepaliDate.month,
        this.currentNepaliDate.year
      )
      .getDay();

    this.currentMonthData[day] = [this.currentNepaliDate.day];
    this.setMonthDataBefore(day - 1, this.currentNepaliDate.day - 1);
    let currentMonthMaxValue =
      this._nepaliDate.nepaliMonths[this.currentNepaliDate.year - 2000][
        this.currentNepaliDate.month
      ];

    this.setMonthDataAfter(
      day + 1,
      this.currentNepaliDate.day + 1,
      currentMonthMaxValue
    );
  }

  private fillEnglishCalendar() {
    const day = new Date(
      `${this.englishCurrentDate.year}/${this.englishCurrentDate.month + 1}/${
        this.englishCurrentDate.day || 1
      }`
    ).getDay();
    const currentEnglishDate = this.englishCurrentDate.day;
    this.currentMonthData[day] = [currentEnglishDate];
    this.setMonthDataBefore(day - 1, currentEnglishDate - 1);
    const monthIndex = this.englishCurrentDate.month;
    const currentMonthMaxValue = this._nepaliDate.isLeapYear(
      this.englishCurrentDate.year
    )
      ? englishLeapMonths[monthIndex]
      : englishMonths[monthIndex];

    this.setMonthDataAfter(
      day + 1,
      currentEnglishDate + 1,
      currentMonthMaxValue
    );
  }

  private setMonthDataBefore(day: any, date: any) {
    if (date >= 1) {
      if (day < 0) {
        day = 6;
      }
      this.currentMonthData[day] = [date, ...this.currentMonthData[day]];
      this.setMonthDataBefore(--day, --date);
    }
  }

  private setMonthDataAfter(day: any, date: any, currentMonthMaxValue: any) {
    if (date <= currentMonthMaxValue) {
      if (day > 6) {
        day = 0;
      }
      this.currentMonthData[day] = [...this.currentMonthData[day], date];
      this.setMonthDataAfter(++day, ++date, currentMonthMaxValue);
    }
  }

  private createEmptySpaces() {
    let dayIndex = 0;
    let value: any;
    Object.values(this.currentMonthData).map((item, index) => {
      value = item;
      if (value.includes(1)) {
        dayIndex = index;
      }
      return value.includes(1);
    });

    if (dayIndex) {
      for (dayIndex; dayIndex > 0; dayIndex--) {
        const monthData = this.currentMonthData[dayIndex - 1];
        this.currentMonthData[dayIndex - 1] = [null, ...monthData];
      }
    }
  }

  public selectDate(day: number) {
    if (this.calendarView == 'BS') {
      this.selectedDate = { ...this.currentNepaliDate, day };
      const en = this._nepaliDate.nepToEngDate(
        this.selectedDate.day,
        this.selectedDate.month,
        this.selectedDate.year
      );
      this.englishSelectedDate = {
        day: en.getDate(),
        month: en.getMonth(),
        year: en.getFullYear(),
      };

      this.selectedMonthIndex = this.currentNepaliDate.month;
      this.selectedYear = this.currentNepaliDate.year;
    } else {
      this.englishSelectedDate = { ...this.englishCurrentDate, day };
      this.selectedDate = this._nepaliDate.engToNepDate(
        this.englishSelectedDate.day,
        this.englishSelectedDate.month,
        this.englishSelectedDate.year
      );
      this.selectedMonthIndex = this.currentDate.getMonth();
      this.selectedYear = this.currentDate.getFullYear();
    }
    this.formatValue();
    this.emitDateInAD();
    this.emitDateInBS();
    this.close();
  }

  public prevMonth() {
    if (this.calendarView === 'BS') {
      this.currentNepaliDate.day = 1;
      if (this.currentNepaliDate.month <= 0) {
        if (this.currentNepaliDate.year > 2001) {
          this.currentNepaliDate.month = 11;
          this.currentNepaliDate.year--;
        }
      } else {
        this.currentNepaliDate.month--;
      }
      this.currentDate = this._nepaliDate.nepToEngDate(
        this.currentNepaliDate.day,
        this.currentNepaliDate.month,
        this.currentNepaliDate.year
      );
      this.setEnglishCurrentDate();
    } else {
      this.englishCurrentDate.day = 1;
      if (this.englishCurrentDate.month <= 0) {
        if (this.englishCurrentDate.year > 1944) {
          this.englishCurrentDate.month = 11;
          this.englishCurrentDate.year--;
        }
      } else {
        this.englishCurrentDate.month--;
      }

      const newDate = {
        day: this.englishCurrentDate.day,
        month: this.englishCurrentDate.month,
        year: this.englishCurrentDate.year,
      };
      this.currentDate = new Date(
        `${newDate.year}/${newDate.month + 1}/${newDate.day}`
      );
      this.setNepaliCurrentDate();
    }

    if (this.calendarView === 'BS') {
      this.selectedMonthIndex = this.currentNepaliDate.month;
      this.selectedYear = this.currentNepaliDate.year;
    } else {
      this.selectedMonthIndex = this.currentDate.getMonth();
      this.selectedYear = this.currentDate.getFullYear();
    }
    this.setCurrentMonthData();
  }

  public nextMonth() {
    if (this.calendarView === 'BS') {
      this.currentNepaliDate.day = 1;
      if (this.currentNepaliDate.month >= 11) {
        if (this.currentNepaliDate.year < 2099) {
          this.currentNepaliDate.month = 0;
          this.currentNepaliDate.year++;
        }
      } else {
        this.currentNepaliDate.month++;
      }

      this.currentDate = this._nepaliDate.nepToEngDate(
        this.currentNepaliDate.day,
        this.currentNepaliDate.month,
        this.currentNepaliDate.year
      );
      this.setEnglishCurrentDate();
    } else {
      this.englishCurrentDate.day = 1;
      if (this.englishCurrentDate.month >= 11) {
        if (this.englishCurrentDate.year < 2044) {
          this.englishCurrentDate.month = 0;
          this.englishCurrentDate.year++;
        }
      } else {
        this.englishCurrentDate.month++;
      }

      const newDate = {
        day: this.englishCurrentDate.day,
        month: this.englishCurrentDate.month,
        year: this.englishCurrentDate.year,
      };
      this.currentDate = new Date(
        `${newDate.year}/${newDate.month + 1}/${newDate.day}`
      );
      this.setNepaliCurrentDate();
    }

    if (this.calendarView === 'BS') {
      this.selectedMonthIndex = this.currentNepaliDate.month;
      this.selectedYear = this.currentNepaliDate.year;
    } else {
      this.selectedMonthIndex = this.currentDate.getMonth();
      this.selectedYear = this.currentDate.getFullYear();
    }
    this.setCurrentMonthData();
  }

  public toggleOpen() {
    if (!this.alwaysVisible) {
      this.isOpen = !this.isOpen;
    }
  }

  public open() {
    this.isOpen = true;
    this.setCurrentDate();
    if (this.calendarView === 'BS') {
      this.currentNepaliDate.day = 1;
      this.selectedMonthIndex = this.currentNepaliDate.month;
      this.selectedYear = this.currentNepaliDate.year;
    } else {
      this.englishCurrentDate.day = 1;
      this.selectedMonthIndex = this.currentDate.getMonth();
      this.selectedYear = this.currentDate.getFullYear();
    }
    this.setCurrentMonthData();
  }

  public close() {
    this.isOpen = false;
  }

  private emitDateInAD() {
    const dateInAD = this._nepaliDate.nepToEngDate(
      this.selectedDate.day,
      this.selectedDate.month,
      this.selectedDate.year
    );
    const defaultFormatDate = this._datePipe.transform(
      dateInAD,
      "YYYY/MM/dd'T'hh:mm:ss'Z'zzzz"
    );
    this.selectedTimeWithTimezone = defaultFormatDate?.substring(
      defaultFormatDate.indexOf('T')
    );

    const dateAD = defaultFormatDate?.split('T')[0];
    if (!dateAD) return;
    const formattedDate = this._nepaliDate.formatDate(dateAD, this.dateFormat);
    const dateToReturn = this.setDateWithTime(formattedDate);
    this.dateInAD.emit(dateToReturn);
  }

  private emitDateInBS() {
    const formattedDate = this._nepaliDate.formatDate(
      this.formattedDate,
      this.dateFormat
    );
    const dateToReturn = this.setDateWithTime(formattedDate);
    this.dateInBS.emit(dateToReturn);
  }

  private setDateWithTime(date: string) {
    if (!this.appendTime) {
      return date;
    }
    return `${date}${this.selectedTimeWithTimezone}`;
  }

  public selectCalendarView(data: any) {
    const type = data.target.value;
    this.calendarView = type;
    this.populateYears();
    this.monthsMapping =
      this.calendarView === 'BS' ? monthsMapping : englishMonthMapping;
    if (this.calendarView === 'BS') {
      this.selectedMonthIndex = this.selectedDate
        ? this.selectedDate.month
        : this.currentNepaliDate.month;
      this.selectedYear = this.selectedDate
        ? this.selectedDate.year
        : this.currentNepaliDate.year;
      this.currentNepaliDate = {
        year: this.selectedYear,
        month: this.selectedMonthIndex,
        day: 1,
      };
    } else {
      this.selectedMonthIndex = this.englishSelectedDate
        ? this.englishSelectedDate.month
        : this.englishCurrentDate.month;
      this.selectedYear = this.englishSelectedDate
        ? this.englishSelectedDate.year
        : this.englishCurrentDate.year;
      this.englishCurrentDate = {
        year: this.selectedYear,
        month: this.selectedMonthIndex,
        day: 1,
      };
    }
    this.setCurrentMonthData();
  }

  private setEnglishCurrentDate() {
    this.englishCurrentDate = {
      day: this.currentDate.getDate(),
      month: this.currentDate.getMonth(),
      year: this.currentDate.getFullYear(),
    };
  }

  private setNepaliCurrentDate() {
    this.currentNepaliDate = this._nepaliDate.engToNepDate(
      this.currentDate.getDate(),
      this.currentDate.getMonth(),
      this.currentDate.getFullYear()
    );
  }
}
