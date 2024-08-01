# Nepali Datepicker Angular

The Angular Nepali Datepicker is an npm package designed to integrate a Nepali date picker component into Angular applications. This package allows users to select dates using the Nepali calendar system, which is different from the Gregorian calendar commonly used in many parts of the world.

Here is a detailed description of the package:

Key Features:

- Nepali Calendar Integration: The date picker supports the Nepali calendar, allowing users to select dates based on the Bikram Sambat (BS) calendar system.

- Angular Compatibility: Designed to work seamlessly with Angular applications, making it easy to integrate into your existing project.

- User-Friendly Interface: Provides a visually appealing and easy-to-use interface for selecting dates.

- Customization Options: Offers various options to customize the appearance and behavior of the date picker to suit different application needs.

- Localization: Supports localization features to display dates and interface elements in the Nepali language.

Datepicker with both AD and BS feature.

See [Demo and Documentation](https://github.com/ewumesh/np-picker) for more information.

## Installation

```script
npm i nep-datepicker
```

## Version support

Angular is a platform and framework for building single-page client applications using HTML and TypeScript. Developed and maintained by Google, it provides a comprehensive suite of tools and features for developing robust and scalable web applications.

This package is designed to support only Angular version 12 and above. It leverages the latest features and improvements introduced in Angular 12, ensuring optimal performance, security, and compatibility. By focusing on Angular 12+, the package benefits from enhanced TypeScript support, improved build and compilation processes, and advanced tooling provided by the Angular CLI. This ensures that users can take full advantage of modern Angular capabilities for building robust and scalable web applications.

[Read More](https://angular.dev/) about Angular.

## Usages

On app.module.ts

```Typescript
import { NepaliDatepickerModule } from 'nep-datepicker';


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

## Properties

| Property      | Type          | Default    | Description    |
| ------------- | ------------- | ---------- | ---            |
| date          | string        |     -      |  Date value in string in format `yyyy/mm/dd` or specific formate specify in `dateFormat` property.|
| dateFormat  | string  | `yyyy/mm/dd` |  Date format for date property and also used for the output date format. |
| dateIn  | string  | `BS` |  Date type of the given date input. Accepts `BS` or `AD`.|
| minDate  | date | - |  Minimum selectable date in `AD`|
| maxDate  | date  | - |  Maximum selectable date in `AD`.|
| language  | string  | ne |  Language for the datepicker view. Accept only `ne`(Nepali) or `en`(English)|
| Placeholder  | string  | Enter date	 |  Placeholder value to display|
| hasMultipleCalendarView	  | boolean  | True |  Allow to switch datepicker with `AD` and `BS` date type|
| isError  | boolean  | False |  Flag to indicate error state and show error outline|
| primaryColor  | string  | - |  Color value for datepicker primary color. Accept string color name or the hex color value.|
| darkTheme  | boolean  | False |  Flag to set dark theme or light theme for the datepicker view.|

## Events
| Event | Parameter | Description |
|-------| --------- | ----------- |
|dateInAD|dateValue|Emits on date selected on datepicker view, Date(AD) value in string with the given dateFormat. Default to `yyyy/mm/dd` format|
|dateInBS|dateValue|Emits on date selected on datepicker view, Date(BS) value in string with the given dateFormat. Default to `yyyy/mm/dd` format|

### Services
Services to converter AD to BS or BS to AD dates.

```Typescript
import { NepaliDatepickerService } from 'nepali-datepicker-angular';

    constructor (private _nepaliDatepickerService: NepaliDatepickerService) {
          const ADDate = this._nepaliDatepickerService.BSToAD(BSDate, 'yyyy/mm/dd');
          const BSDate = this._nepaliDatepickerService.ADToBS(ADDate, 'yyyy/mm/dd');
        }
        
```
- ADToBS
    - Converts AD Date to BS Date. It requires 2 arguments,
        - AD date in string
        - format of the AD date
    returns BS date in string with same format as of AD date.

- BSToAD
    - Converts BS Date to AD Date. It requires 2 arguments,
        - BS date in string
        - format of the AD date
    returns AD date in string with same format as of BS date.

[Link](npmjs.com/package/nep-datepicker) to NPM package.
