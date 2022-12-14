import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DesignSystemModule } from 'iptdevs-design-system';

import { AppComponent } from './app.component';
import { CalendarnewComponent } from './fullcalendar/calendarnew/calendarnew.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import 'web-component-essentials';
import { PrimeNgModule } from './prime-ng/pirme-ng.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AdminEventsComponent } from './fullcalendar/admin-events/admin-events.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CalendarnewComponent,
    AdminEventsComponent,

  ],
  imports: [
    BrowserModule,
    PrimeNgModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DesignSystemModule,


  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
