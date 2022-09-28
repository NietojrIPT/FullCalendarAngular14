import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CalendarOptions, defineFullCalendarElement, FullCalendarElement,EventClickArg,DateSelectArg,EventApi} from '@fullcalendar/web-component';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent,CalendarView} from 'angular-calendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import { formatDate, Calendar } from '@fullcalendar/core';
import { PrimeNGConfig } from 'primeng/api';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
defineFullCalendarElement();

@Component({
  selector: 'app-calendarnew',
  templateUrl: './calendarnew.component.html',
  styleUrls: ['./calendarnew.component.css'],
})
export class CalendarnewComponent implements OnInit {

  @ViewChild('modalContent', { static: true })
  modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  currentDate: any;


  modalData: {
    action: string;
    event: CalendarEvent;
  } | undefined;
  
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
    { title: 'Clase A2', start: '2022-09-07', backgroundColor: 'red', borderColor: 'red', dayGridPlugin: true},

    {title: 'Club Conversacional', start: '2022-09-02',  end: '2022-09-04',
      extendedProps: {
        status: 'dobe'
      }
    },

    {
      start: subDays(startOfDay(new Date()), 2),
      end: addDays(new Date(), 2),
      title: 'A 3 day event',
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
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
      // right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek', 
      right: 'dayGridMonth,dayGridWeek,dayGrid', 

    },
    plugins: [dayGridPlugin],
    
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS,
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    // select: this.handleDateSelect.bind(this),
    select: this.prueba.bind('hola'),

    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this.events),
    // eventAdd:
    /* you can update a remote database when these fire:
    eventChange:
    eventRemove:
    */
    events: this.events
  };

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    let str = formatDate(new Date(), {
      month: 'long',
      year: 'numeric',
      day: 'numeric',
    });
    console.log('la fecha de hoy es ' + str);

    //ver eventos cuantos eventos hay 
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

  prueba(evnt: any){
    console.log(evnt);
    
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    console.log(selectInfo);

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
    console.log(clickInfo);
    
    if (confirm(`¿Estás seguro de que quieres eliminar el evento? '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent: CalendarEvent<any>) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
  }

  handleEvents(events: EventApi[]) {
    console.log('EventSet '+events);

    
    this.currentEvents = events;
  }
}
