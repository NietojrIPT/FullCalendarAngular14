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

  eventsForm!: FormGroup;

  constructor(fb: FormBuilder) { 
    this.eventsForm = fb.group({
      title:            ['ggdfgdfgdfg' ],
      descriptionEvent: [{ value: '', disabled: true }],
      locationEvent:    [{ value: '', disabled: true }],
      start:            [{ value: '', disabled: true }],
      end:              [{ value: '', disabled: true }],
      colorEvent:       [{ value: '', disabled: true }],
    });
  }

  ngOnInit(): void {
    this.eventsForm.controls['title'].setValue('hola mundo');
  }

  closeModal(){
    this.closeMod.emit(false);
    this.visible = false;
  }
  
  sendForm(form: FormGroup) {
  }

}
