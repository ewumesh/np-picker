# NepaliDatepickerAngular

Angular library with no dependency.

Datepicker with both AD and BS feature.

See [Demo and Documentation](https://github.com/ewumesh/np-picker) for more information.

## installation

```script
npm i nepali-datepicker-angular
```

## version support

angular version 12 or above.

## usages

On app.module.ts

```Typescript
import { NepaliDatepickerModule } from 'nepali-datepicker-angular';


@NgModule({
  declarations: [...],
  imports: [..., NepaliDatepickerModule, ...],
  providers: [...],
  bootstrap: [...],
})
```

on component to use

```html
<ne-datepicker [date]="date" dateIn="AD" (dateInBS)="updateNepaliDate($event)" (dateInAD)="updateEnglishDate($event)"> </ne-datepicker>
```

[Link](https://www.npmjs.com/package/nep-datepicker) to NPM package.
