import { Injectable } from '@angular/core';
import {
  englishLeapMonths,
  englishMonths,
  nepaliMonths,
} from '../constants/data';

@Injectable({
  providedIn: 'root',
})
export class NepaliDatepickerAngularPrivateService {
  englishMonths = englishMonths;
  englishLeapMonths = englishLeapMonths;
  nepaliMonths = nepaliMonths;
  englishYear: any;
  englishMonth: any;
  englishDate: any;
  nepaliYear: any;
  nepaliMonth: any;
  nepaliDate: any;

  weekDay: any;
  dateSeparatedCharacters = ['/', '-'];

  constructor() {}

  setCurrentNepaliDate() {
    let today = new Date();
    return this.engToNepDate(
      today.getDate(),
      today.getMonth(),
      today.getFullYear()
    );
  }

  //English to Nepali date conversion
  engToNepDate(date: any, month: any, year: any) {
    if (!this.isEnglishRange(date, month, year)) {
      throw new Error('Invalid date Only date between 1944 and 2043.');
    }

    this.englishYear = year;
    this.englishMonth = month + 1;
    this.englishDate = date;

    //Setting nepali reference to 2000/1/1 with english date 1943/4/14
    this.nepaliYear = 2000;
    this.nepaliMonth = 1;
    this.nepaliDate = 1;

    let difference = this.getEnglishDateDifference(1943, 4, 14);

    let index = 0;
    while (difference >= this.nepaliYearDays(index)) {
      this.nepaliYear++;
      difference = difference - this.nepaliYearDays(index);
      index++;
    }

    let i = 0;
    while (difference >= this.nepaliMonths[index][i]) {
      difference = difference - this.nepaliMonths[index][i];
      this.nepaliMonth++;
      i++;
    }
    this.nepaliMonth--;

    this.nepaliDate = this.nepaliDate + difference;

    return {
      day: this.nepaliDate,
      month: this.nepaliMonth,
      year: this.nepaliYear,
    };
  }

  toEnglishString(format: any) {
    if (typeof format === 'undefined') format = '-';
    return (
      this.englishYear + format + this.englishMonth + format + this.englishDate
    );
  }

  getEnglishDateDifference(year: any, month: any, date: any) {
    let difference =
      this.countTotalEnglishDays(
        this.englishYear,
        this.englishMonth,
        this.englishDate
      ) - this.countTotalEnglishDays(year, month, date);
    return difference < 0 ? -difference : difference;
  }

  countTotalEnglishDays(year: any, month: any, date: any) {
    let totalDays = year * 365 + date;

    for (let i = 0; i < month - 1; i++)
      totalDays = totalDays + this.englishMonths[i];

    totalDays = totalDays + this.countleap(year, month);
    return totalDays;
  }

  countleap(year: any, month: any) {
    if (month <= 2) year--;

    return (
      Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400)
    );
  }

  isEnglishRange(date: any, month: any, year: any) {
    if (year < 1944 || year > 2043) return false;
    if (month < 0 || month > 11) {
      throw new Error('Invalid Date');
    }
    if (date < 1 || date > 31) {
      throw new Error('Invalid Date');
    }

    return true;
  }

  isLeapYear(year: any) {
    if (year % 4 === 0) {
      return year % 100 === 0 ? year % 400 === 0 : true;
    } else return false;
  }

  nepToEngDate(date: any, month: any, year: any) {
    if (!this.isNepaliRange(date, month, year)) {
      throw new Error('Invalid date, Only date between 2000 and 2099.');
    }

    this.nepaliYear = year;
    this.nepaliMonth = month + 1;
    this.nepaliDate = date;

    this.englishYear = 1944;
    this.englishMonth = 1;
    this.englishDate = 1;

    let difference = this.getNepaliDateDifference(2000, 9, 17);

    while (difference >= (this.isLeapYear(this.englishYear) ? 366 : 365)) {
      difference = difference - (this.isLeapYear(this.englishYear) ? 366 : 365);
      this.englishYear++;
    }

    let monthDays = this.isLeapYear(this.englishYear)
      ? this.englishLeapMonths
      : this.englishMonths;
    let i = 0;
    while (difference >= monthDays[i]) {
      this.englishMonth++;
      difference = difference - monthDays[i];
      i++;
    }

    this.englishDate = this.englishDate + difference;

    return new Date(
      this.englishYear + '-' + this.englishMonth + '-' + this.englishDate
    );
  }

  toNepaliString(format: any) {
    if (typeof format === 'undefined') format = '-';
    return (
      this.nepaliYear + format + this.nepaliMonth + format + this.nepaliDate
    );
  }

  getNepaliDateDifference(year: any, month: any, date: any) {
    const a = this.countTotalNepaliDays(
      this.nepaliYear,
      this.nepaliMonth,
      this.nepaliDate
    );
    const b = this.countTotalNepaliDays(year, month, date);
    let difference = a - b;
    return difference < 0 ? -difference : difference;
  }

  countTotalNepaliDays(year: any, month: any, date: any) {
    let total = 0;
    if (year < 2000) return 0;

    total = total + (date - 1);

    let yearIndex = year - 2000;
    for (let i = 0; i < month - 1; i++)
      total = total + this.nepaliMonths[yearIndex][i];

    for (let i = 0; i < yearIndex; i++) total = total + this.nepaliYearDays(i);

    return total;
  }

  nepaliYearDays(index: any) {
    let total = 0;
    for (let i = 0; i < 12; i++) total += this.nepaliMonths[index][i];
    return total;
  }

  isNepaliRange(date: any, month: any, year: any) {
    if (year < 2000 || year > 2099) return false;

    if (month < 0 || month > 11) {
      throw new Error('Invalid Date');
    }

    if (date < 1 || date > this.nepaliMonths[year - 2000][month]) {
      throw new Error('Invalid Date');
    }

    return true;
  }

  public formatDate(date: string, format: string) {
    const subDates = date.split('/');
    const regex = {
      year: /y{2,4}/i,
      month: /m{1,2}/i,
      day: /d{1,2}/i,
    };
    format = format.replace(regex.year, subDates[0]);
    format = format.replace(regex.month, subDates[1]);
    format = format.replace(regex.day, subDates[2]);
    return format;
  }

  changeStructure(value: string) {
    value = value.split('T')[0];
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
}
