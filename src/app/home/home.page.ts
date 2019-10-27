import {
  Component
} from '@angular/core';
import {
  CalendarService
} from '../service/calendar/calendar.service';
import {
  DatabaseService
} from '../service/database/database.service';
import {
  Router
} from '@angular/router';
import {
  UtilsService
} from '../service/utils/utils.service';
import {
  Platform
} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public count = 30;
  public changeable = "primary"
  constructor(private router: Router, private platform: Platform, private db: DatabaseService, private datepick: CalendarService, private utils: UtilsService) {

        let wait = setTimeout( () => {
          console.log("a")
         this.updateDays();
     }, 100);
  }
  updateDays() {
    this.platform.ready().then(() => {
      this.db.loadDates().then(data => {
        this.count = 30 - data.rows.length;
        if (this.count <= 0) {
          this.changeable = "danger";
          this.count = 0;
          this.utils.presentAlert("Has agotado los dias", "Recarga la tarjeta", [{
            text: "Entendido"
          }]);
        }
        if (this.count <= 15 && this.count > 5) {
          this.changeable = "warning";
        } else if (this.count <= 5 && this.count > 0) {
          this.changeable = "danger";
          this.utils.presentAlert("Queda poco...", "Recarga la cuando puedas tarjeta", [{
            text: "Entendido"
          }]);
        }
      });
    });
  }
  add() {
    let hoy = new Date();
    this.db.addDate(hoy)
    this.updateDays();

  }
  addCustom() {
    this.datepick.create().then(
      date => {
        this.db.addDate(date)
        this.updateDays();
      }
    );
  }
  toLogs() {
    this.updateDays();
    this.router.navigate(["/logs"])
  }
}