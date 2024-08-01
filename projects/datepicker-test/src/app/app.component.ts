import { Component } from '@angular/core';

type Language = 'en' | 'ne';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'datepicker-test';

  public languageOptions = [
    {
      label: 'English',
      value: 'en',
    },
    {
      label: 'Nepali',
      value: 'ne',
    },
  ];

  public date = '';
  public dateFormat = 'yyyy/mm/dd';
  public nepaliDate: string = '';
  public englishDate: string = '';
  public itNepaliDate: string = '';
  public itEnglishDate: string = '';
  public minDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
  public maxDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
  public primaryColor = '#1d49e7';
  public isDark = false;
  public isError = false;
  public language = this.languageOptions[0].value as Language;
  public hasMultipleCalendarView = true;

  public updateNepaliDate(date: string) {
    this.nepaliDate = date;
  }
  public updateEnglishDate(date: string) {
    this.englishDate = date;
  }
  public updateItNepaliDate(date: string) {
    this.itNepaliDate = date;
  }
  public updateItEnglishDate(date: string) {
    this.itEnglishDate = date;
  }

  public updateMinDate() {}
}
