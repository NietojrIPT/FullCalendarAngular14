import { Component, OnInit,  } from '@angular/core';
import { CalendarOptions, defineFullCalendarElement, FullCalendarElement } from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';
import {formatDate} from '@fullcalendar/core'

// make the <full-calendar> element globally available by calling this function at the top-level
defineFullCalendarElement();

@Component({
  selector: 'app-calendarnew',
  templateUrl: './calendarnew.component.html',
  styleUrls: ['./calendarnew.component.css']
})
export class CalendarnewComponent implements OnInit {

  presentDays: number = 0;
  absentDays: number = 0;
  events: any = [
    {title: 'Clase A1.1', date: '2022-09-16', color: '#173d23'},
    {title: 'Clase B1', date: '2022-09-16', color: '#5b6011'},
    {title: 'Clase A1.2', date: '2022-09-16', color: '#601142'},
    {title: 'Clase A1.1', date: '2022-09-15', color: '#173d23'},
    {title: 'Clase B1', date: '2022-09-12', color: '#5b6011'},
  ];

  // title = 'fullcalendario';
  open = false;


  // Flujo normal
  // calendarOptions: CalendarOptions = {
  //   plugins: [dayGridPlugin],
  //   headerToolbar: {
  //     left: 'prev,next today',
  //     center: 'title',
  //     right: 'dayGridMonth,dayGridWeek,dayGridDay'
  //   },
  //   weekends: false
  // };

//  Modificación de propiedades
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    weekends: false, // initial value
    events: this.events
  };

  toggleWeekends() {
    // make a copy while overriding some values
    this.calendarOptions = {
      ...this.calendarOptions,
      weekends: !this.calendarOptions.weekends,
    }
  }

  constructor() { }

  ngOnInit(): void {
    let str = formatDate(new Date(), {
      month: 'long',
      year: 'numeric',
      day: 'numeric'
    });
    
    console.log('la fecha de hoy es ' + str);
  }

}
