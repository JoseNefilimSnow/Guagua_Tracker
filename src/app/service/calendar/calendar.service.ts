import { Injectable } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { DatabaseService } from '../database/database.service';
import { UtilsService } from '../utils/utils.service';
@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private datePicker: DatePicker,private db:DatabaseService,private utils:UtilsService) { }

  create(){
    return this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    })
  }
}
