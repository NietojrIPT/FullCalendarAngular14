import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CalendarnewComponent } from './fullcalendar/calendarnew/calendarnew.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import 'web-component-essentials';

@NgModule({
  declarations: [
    AppComponent,
    CalendarnewComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
