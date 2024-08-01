import { Injectable } from '@angular/core';
import { NepaliDatepickerAngularPrivateService } from './nep-datepicker-private.service';
type DateFormat = 'yyyy/mm/dd' | 'dd/mm/yyyy' | 'yyyy-mm-dd' | 'dd-mm-yyyy';
@Injectable({
  providedIn: 'root',
})
export class NepaliDatepickerService {
  constructor(
    private _datePicketService: NepaliDatepickerAngularPrivateService
  ) {}

  /**
   * @param dateInAD string value of AD date only
   * @param format 'yyyy/mm/dd' | 'dd/mm/yyyy' | 'yyyy-mm-dd' | 'dd-mm-yyyy' value in which the dateInAD is formatted with
   * @returns string BS date with same as provided in format params
   */
  ADToBS(dateInAD: string, format: DateFormat) {
    const formattedDate = this._datePicketService.changeStructure(dateInAD);
    if (!formattedDate) throw new Error('Invalid date value');
    const BSDate = this._datePicketService.engToNepDate(
      formattedDate.day,
      formattedDate.month,
      formattedDate.year
    );
    return this.formatDate(BSDate, format);
  }

  /**
   *
   * @param dateInBS string vale of BS date only
   * @param format 'yyyy/mm/dd' | 'dd/mm/yyyy' | 'yyyy-mm-dd' | 'dd-mm-yyyy' value in which the dateInBS is formatted with
   * @returns string AD date with same as provided in format params
   */
  BSToAD(dateInBS: string, format: DateFormat) {
    const formattedDate = this._datePicketService.changeStructure(dateInBS);
    if (!formattedDate) throw new Error('Invalid date value');
    const ADDate = this._datePicketService.nepToEngDate(
      formattedDate.day,
      formattedDate.month,
      formattedDate.year
    );
    return this.formatDate(
      {
        day: ADDate.getDate(),
        month: ADDate.getMonth(),
        year: ADDate.getFullYear(),
      },
      format
    );
  }

  private formatDate(
    date: { day: number; month: number; year: number },
    format: string
  ) {
    const regex = {
      year: /y{2,4}/i,
      month: /m{1,2}/i,
      day: /d{1,2}/i,
    };
    format = format.replace(regex.year, date.year.toString());
    format = format.replace(regex.month, this.zeroPad(date.month + 1, 2));
    format = format.replace(regex.day, this.zeroPad(date.day, 2));
    return format;
  }

  private zeroPad(num: number, places: number) {
    return String(num).padStart(places, '0');
  }
}
