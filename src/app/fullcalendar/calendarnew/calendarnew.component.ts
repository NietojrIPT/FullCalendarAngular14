import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  CalendarOptions,
  defineFullCalendarElement,
  FullCalendarElement,
  EventClickArg,
  DateSelectArg,
  EventApi,
} from '@fullcalendar/web-component';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import { formatDate, Calendar } from '@fullcalendar/core';
import { PrimeNGConfig } from 'primeng/api';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { GoogleEventRq } from 'src/app/core/models/google-event.model';
import { CalendarService } from 'src/app/core/services/calendar.service';
import { eventqueryRq } from 'src/app/core/models/calendar-rq.models';
defineFullCalendarElement();

@Component({
  selector: 'app-calendarnew',
  templateUrl: './calendarnew.component.html',
  styleUrls: ['./calendarnew.component.css'],
})
export class CalendarnewComponent implements OnInit {

  eventsToFollow?: any;

  refreshModal: boolean = true;

  modalVisible: boolean = false;

  modalTitle: string = '';

  view: CalendarView = CalendarView.Month;

  eventGoogleCalendar: GoogleEventRq[] = [];

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  currentDate: any;

  titleevent: string = '';

  presentDays: number = 0;

  absentDays: number = 0;

  eventos: GoogleEventRq[] = [];

  currentEvents: EventApi[] = [];

  calendarVisible = true;

  displayBasic: boolean = false;

  open = false;

  start: any;

  calendarOptions!: CalendarOptions;

  evet: any[] = [];

  constructor(
    private primengConfig: PrimeNGConfig,
    private calendarService: CalendarService
  ) {}

  ngAfterViewInito():void{
  }
  
  ngOnInit(): void {
    this.eventByIdCalendar('nietojr1@gmail.com');

    let str = formatDate(new Date(), {
      month: 'long',
      year: 'numeric',
      day: 'numeric',
    });
    console.log('la fecha de hoy es ' + str);

    //ver eventos cuantos eventos hay
    // this.eventos.forEach((e: { [x: string]: string }) => {
    //   if (e['title'] == 'Clase A1.1') {
    //     this.presentDays++;
    //   } else if (e['title'] == 'Clase A1.2') {
    //     this.absentDays++;
    //   }
    // });
    // console.log('Clase A1.1: ' + this.presentDays);
    // console.log('Clase A1.2: ' + this.absentDays);
    // console.log('Clase B1: ' + this.absentDays);
  }

  eventByIdCalendar(idCalndar: string) {
    this.calendarService.getEventByIdCalendar(idCalndar).subscribe((response) => {
        this.eventos = response;
        this.calendario();
      });
  }

  eventByDayTime(){
    let params:eventqueryRq = {
      idCalendar: 'nietojr1@gmail.com',
      startTime:  '2022/10/04 00:00:00',
      endTime:    '2022/10/04 23:00:00'
    }    
    this.calendarService.postEventByDayTime(params).subscribe((response) => {
      this.eventos = response;
      this.calendario();
    });
  }

  calendario() {
    this.calendarOptions = {
      headerToolbar: {
        left: 'prev,today,next',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGrid',
      },
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      // initialEvents: INITIAL_EVENTS,
      weekends: true,
      editable: true,
      selectable: false,
      selectMirror: false,
      dayMaxEvents: false,
      select: this.handleDateSelect.bind(this),
      // eventClick: this.handleEventClick.bind(this),
      eventClick: this.viewEvent.bind(this),
      eventsSet: this.handleEvents.bind(this),
      // eventAdd:
      /* you can update a remote database when these fire:
      eventChange:
      eventRemove:
      */
      locale: 'es',
      events: this.eventos,
    };
  }

  toggleWeekends() {
    this.calendarOptions = {
      ...this.calendarOptions,
      weekends: !this.calendarOptions.weekends,
    };
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    console.log('date select');
    
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    console.log(clickInfo);
    if (
      confirm(
        `¿Estás seguro de que quieres eliminar el evento? '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    console.log('EventSet ' + events);
    this.currentEvents = events;
  }


  closeModal(event: boolean) {
    this.modalVisible = event;
  }

  viewEvent(evnt: any){
    this.eventsToFollow = evnt;
    this.refreshModal = false;
    this.modalVisible = true;
    this.modalTitle = 'Datos del Evento'
  }
}
