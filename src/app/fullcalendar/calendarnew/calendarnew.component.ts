import { Component, OnInit } from '@angular/core';
import {
  CalendarOptions,
  defineFullCalendarElement,
  FullCalendarElement,EventClickArg,DateSelectArg,EventApi
} from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';
import { formatDate } from '@fullcalendar/core';
import { PrimeNGConfig } from 'primeng/api';
import { INITIAL_EVENTS, createEventId } from './event-utils';
// make the <full-calendar> element globally available by calling this function at the top-level
defineFullCalendarElement();

@Component({
  selector: 'app-calendarnew',
  templateUrl: './calendarnew.component.html',
  styleUrls: ['./calendarnew.component.css'],
})
export class CalendarnewComponent implements OnInit {
  titleevent: string = '';
  presentDays: number = 0;
  absentDays: number = 0;
  events: any = [
    { title: 'Clase A1.1', date: '2022-09-16', color: '#173d23' },
    { title: 'Clase B1', date: '2022-09-19', color: '#5b6011' },
    { title: 'Clase A1.2', date: '2022-09-16', color: '#601142' },
    { title: 'Clase A1.1', date: '2022-09-15', color: '#173d23' },
    { title: 'Clase B1', date: '2022-09-12', color: '#5b6011' },
    { title: 'Clase A2', start: '2022-09-07', backgroundColor: 'green', borderColor: 'red'},
    {
      title: 'Club Conversacional',
      start: '2022-09-01',
      extendedProps: {
        status: 'done'
      }
    }
  ];
  
  currentEvents: EventApi[] = [];
  calendarVisible = true;
  displayBasic: boolean = false;
  open = false;
  start: any;

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS,
    weekends: false,
    editable: true,
    selectable: true,
    selectMirror: false,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    // eventAdd: 
    /* you can update a remote database when these fire:
    eventChange:
    eventRemove:
    */
    events: this.events,
  };

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    let str = formatDate(new Date(), {
      month: 'long',
      year: 'numeric',
      day: 'numeric',
    });
    console.log('la fecha de hoy es ' + str);

    //ver eventos
    this.events.forEach((e: { [x: string]: string }) => {
      if (e['title'] == 'Clase A1.1') {
        this.presentDays++;
      } else if (e['title'] == 'Clase A1.2') {
        this.absentDays++;
      }
    });
    console.log('Clase A1.1: ' + this.presentDays);
    console.log('Clase A1.2: ' + this.absentDays);
    console.log('Clase B1: ' + this.absentDays);
  }

  toggleWeekends() {
    // make a copy while overriding some values
    this.calendarOptions = {
      ...this.calendarOptions,
      weekends: !this.calendarOptions.weekends,
    };
  }

  // showBasicDialog(arg: any) {
  //   console.log(arg.event._def.title);
  //   this.titleevent = arg.event._def.title;
  //   this.displayBasic = true;
  //   this.start = arg.event.start;
  // }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    console.log('selectInfo');
    
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`¿Estás seguro de que quieres eliminar el evento? '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }
}
