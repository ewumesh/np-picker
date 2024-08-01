import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NepaliDatepickerModule } from 'nepali-datepicker-angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, NepaliDatepickerModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
