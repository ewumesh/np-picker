import { Pipe, PipeTransform } from '@angular/core';
import { numberMapping, wordsMapping } from '../constants/mapping';

@Pipe({
  name: 'toNp',
})
export class ToNpPipe implements PipeTransform {
  transform(
    value: number | string,
    language: string = 'ne',
    type: string = 'number'
  ): any {
    if (value) {
      if (language === 'ne') {
        switch (type) {
          case 'number':
            const split = value.toString().split('');
            return split
              .map((n) => {
                if (n === ' ') {
                  return ' ';
                }
                return numberMapping[+n] ? numberMapping[+n] : n;
              })
              .join('');
          case 'word':
            let wrd = value.toString().toLowerCase();
            if (wrd === 'month') {
              return wordsMapping['month'];
            } else if (wrd === 'year') {
              return wordsMapping['year'];
            } else {
              return wrd;
            }

          default:
        }
      } else {
        return value;
      }
    } else {
      return '';
    }
  }
}
