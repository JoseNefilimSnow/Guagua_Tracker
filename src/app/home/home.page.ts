import { Component } from '@angular/core';
import { CalendarService } from '../service/calendar/calendar.service';
import { DatabaseService } from '../service/database/database.service';
import { Router } from '@angular/router';
import { UtilsService } from '../service/utils/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router:Router,private db:DatabaseService,private datepick:CalendarService,private utils:UtilsService) {}

  add(){
    let hoy = new Date();
    console.log(hoy)
    this.db.addDate(hoy);
  }
  addCustom(){
    this.datepick.create();
  }
  toLogs(){
    this.router.navigate(["/logs"])
  }
}
