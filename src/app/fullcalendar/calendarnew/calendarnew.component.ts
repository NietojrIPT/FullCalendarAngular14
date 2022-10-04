import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CalendarOptions, defineFullCalendarElement, FullCalendarElement,EventClickArg,DateSelectArg,EventApi} from '@fullcalendar/web-component';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent,CalendarView} from 'angular-calendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import { formatDate, Calendar } from '@fullcalendar/core';
import { PrimeNGConfig } from 'primeng/api';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { GoogleEventRq } from 'src/app/core/models/google-event.model';
import { CalendarService } from 'src/app/core/services/calendar.service';
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

  eventGoogleCalendar: GoogleEventRq[] = [];

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
  eventos: GoogleEventRq []= [
    // {title: 'Club Conversacional', start: '2022-10-07',  end: '2022-10-09', backgroundColor: '#5b6011', borderColor: '#0b0047',
    // extendedProps: {
    //   nameCalendar: 'dato adicional',
    //   descriptionEvent: 'hola mundoooooooo',
    //   colorEvent: 6,
    //   locationEvent: 'Salon',
    //   dateCreation: "2018-03-02T18:49:31.000Z"
    //   }
    // }
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
    // select: this.handleDateSelect.bind(this),
    select: this.prueba.bind('hola'),

    eventClick: this.handleEventClick.bind(this),
    // eventsSet: this.handleEvents.bind(this.events),
    // eventAdd:
    /* you can update a remote database when these fire:
    eventChange:
    eventRemove:
    */
    events: this.eventos
  };

  constructor(private primengConfig: PrimeNGConfig, private calendarService:CalendarService) {}

  ngOnInit(): void {
    

    this.eventByIdCalendar('nietojr1@gmail.com');

    let str = formatDate(new Date(), {
      month: 'long',
      year: 'numeric',
      day: 'numeric',
    });
    console.log('la fecha de hoy es ' + str);

    //ver eventos cuantos eventos hay 
    // this.events.forEach((e: { [x: string]: string }) => {
    //   if (e['title'] == 'Clase A1.1') {
    //     this.presentDays++;
    //   } else if (e['title'] == 'Clase A1.2') {
    //     this.absentDays++;
    //   }
    // });
    console.log('Clase A1.1: ' + this.presentDays);
    console.log('Clase A1.2: ' + this.absentDays);
    console.log('Clase B1: ' + this.absentDays);
  }

  eventByIdCalendar(idCalndar: string) {
   let evet:any[]=[];
    this.calendarService.getEventByIdCalendar(idCalndar).subscribe((response) => {
      evet=response;
      console.log(evet);

      let evento:GoogleEventRq ={
        title: '',
        start: '',
        end: '',
        backgroundColor: '',
        borderColor: '',
        extendedProps: {
          nameCalendar: 'dato adicional',
          descriptionEvent: 'hola mundoooooooo',
          colorEvent: 6,
          locationEvent: 'Salon',
          dateCreation: "2018-03-02T18:49:31.000Z"
          }
      }
      
      for (let i = 0; i < evet.length; i++) {
       evento.title = evet[i].title;
       evento.start = evet[i].start;
       evento.end   = evet[i].end;
       evento.extendedProps.nameCalendar     == evet[i].nameCalendar;
       evento.extendedProps.descriptionEvent == evet[i].descriptionEvent;
       evento.extendedProps.colorEvent       == evet[i].colorEvent;
       evento.extendedProps.locationEvent    == evet[i].locationEvent;
       evento.extendedProps.dateCreation     == evet[i].dateCreation;
      
       this.eventos.push(evento);
       console.log(this.eventos);
       
      }
      });

      

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

  nextYear(){

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

  // eventTimesChanged({
  //   event,
  //   newStart,
  //   newEnd,
  // }: CalendarEventTimesChangedEvent): void {
  //   this.events = this.events.map((iEvent: CalendarEvent<any>) => {
  //     if (iEvent === event) {
  //       return {
  //         ...event,
  //         start: newStart,
  //         end: newEnd,
  //       };
  //     }
  //     return iEvent;
  //   });
  // }

  handleEvents(events: EventApi[]) {
    console.log('EventSet '+events);

    
    this.currentEvents = events;
  }
}