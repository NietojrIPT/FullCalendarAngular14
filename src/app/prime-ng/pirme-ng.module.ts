import { NgModule } from '@angular/core';

// PrimeNG
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {CalendarModule} from 'primeng/calendar';
import {CheckboxModule} from 'primeng/checkbox';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {FieldsetModule} from 'primeng/fieldset';
import {FileUploadModule} from 'primeng/fileupload';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MenubarModule} from 'primeng/menubar';
import {MultiSelectModule} from 'primeng/multiselect';
import {ProgressBarModule} from 'primeng/progressbar';
import {SliderModule} from 'primeng/slider';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TabViewModule} from 'primeng/tabview';
import {PanelModule} from 'primeng/panel';
import {MenuItem} from 'primeng/api';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {AccordionModule} from 'primeng/accordion';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {SpeedDialModule} from 'primeng/speeddial';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {RippleModule} from 'primeng/ripple';
import {SplitButtonModule} from 'primeng/splitbutton';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { TagModule } from 'primeng/tag';



@NgModule({
  declarations: [],
  exports: [
    ButtonModule,
    CardModule,
    CalendarModule,
    CheckboxModule,
	  ContextMenuModule,
	  DialogModule,
    DropdownModule,
    FieldsetModule,
    FileUploadModule,
    InputTextModule,
    InputTextareaModule,
    MenubarModule,
	  MultiSelectModule,
    ProgressBarModule,
	  SliderModule,
    TableModule,
    ToolbarModule,
    CheckboxModule,
    TabViewModule,
    ToastModule,
    PanelModule,
    TieredMenuModule,
    AccordionModule,
    MessagesModule,
    MessageModule,
    SpeedDialModule,
    ProgressSpinnerModule,
    RippleModule,
    SplitButtonModule,
    ToggleButtonModule,
    TagModule
  ]
})
export class PrimeNgModule { }
