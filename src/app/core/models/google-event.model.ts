export interface GoogleEventsRq {
    googleEvent: GoogleEvent;
    calendarId:  string;
}

export interface GoogleEvent {
    anyoneCanAddSelf:        null;
    attendeesOmitted:        null;
    colorId:                 null;
    created:                 Date;
    description:             null;
    endTimeUnspecified:      null;
    etag:                    string;
    eventType:               string;
    guestsCanInviteOthers:   null;
    guestsCanModify:         null;
    guestsCanSeeOtherGuests: null;
    hangoutLink:             null;
    htmlLink:                string;
    iCalUID:                 string;
    id:                      string;
    kind:                    string;
    location:                null;
    locked:                  null;
    privateCopy:             null;
    recurrence:              null;
    recurringEventId:        null;
    sequence:                number;
    status:                  string;
    summary:                 string;
    transparency:            null;
    updated:                 Date;
    visibility:              null;
    creator:                 Creator;
    organizer:               Creator;
    start:                   dateTimeFull;
    end:                     dateTimeFull;
    reminders:               Reminders;
}

export interface Creator {
    displayName: null;
    email:       string;
    id:          null;
    self:        boolean;
}

export interface dateTimeFull {
    date:     null;
    dateTime: Date;
    timeZone: string;
}

export interface Reminders {
    useDefault: boolean;
}

export interface GoogleEvent2Rq {
    nameCalendar:     null | string;
    title:            string;
    descriptionEvent: null | string;
    locationEvent:    null | string;
    dateCreation:     Date;
    colorEvent:       null | string;
    start:            Date;
    end:              Date;
}

export interface GoogleEventRq {
    title:            string;
    start:            string;
    end:              string;
    backgroundColor:  string;
    borderColor:      string;
    nameCalendar:     string;
    descriptionEvent: string;
    colorEvent:       number;
    locationEvent:    string;
    dateCreation:     string;
}

