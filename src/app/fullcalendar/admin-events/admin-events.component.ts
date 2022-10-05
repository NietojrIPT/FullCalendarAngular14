import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() modalTitle!: string;
  @Output() closeMod = new EventEmitter<boolean>();

  eventsFrom!: FormGroup;

  constructor(fb: FormBuilder) { 
    this.eventsFrom = fb.group({
      title:            [{ value: '', disabled: true }],
      descriptionEvent: [{ value: '', disabled: true }],
      locationEvent:    [{ value: '', disabled: true }],
      start:            [{ value: '', disabled: true }],
      end:              [{ value: '', disabled: true }],
      colorEvent:       [{ value: '', disabled: true }],
    });
  }

  ngOnInit(): void {
  }

  closeModal(){
    this.closeMod.emit(false);
    this.visible = false;
  }

  sendForm(form: FormGroup) {
  }

}
