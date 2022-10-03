import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { eventqueryRq } from '../models/calendar-rq.models';


@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private SERVICE_URL = 'http://localhost:8000/api/';

  httpOptions: any;

  constructor(private http: HttpClient) {}


  getEventByIdCalendar(idCalendar: string): Observable<any> {
    let serviceUrl = this.SERVICE_URL + 'get/event/calendar/idcalendar/all/' + idCalendar;
    return this.http.get(serviceUrl);
  }

  getEventByDayTime(params: eventqueryRq): Observable<any> {
    let serviceUrl = this.SERVICE_URL + 'get/event/calendar/idcalendar/by/datetiem';
    this.generateRequestParams(params);
    return this.http.post(serviceUrl, this.httpOptions);
  }


  private generateRequestParams(param: any) {
    this.httpOptions = {
      header: new HttpHeaders(),
      params: param,
    };
  }
}
