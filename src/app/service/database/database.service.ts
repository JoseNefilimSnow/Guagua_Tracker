import {
  Platform
} from '@ionic/angular';
import {
  Injectable
} from '@angular/core';
import {
  SQLitePorter
} from '@ionic-native/sqlite-porter/ngx';
import {
  HttpClient
} from '@angular/common/http';
import {
  SQLite,
  SQLiteObject
} from '@ionic-native/sqlite/ngx';
import {
  BehaviorSubject
} from 'rxjs';
import {
  UtilsService
} from '../utils/utils.service';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject < boolean > = new BehaviorSubject(false);

  dates = new BehaviorSubject([]);

  constructor(private plt: Platform, private sqlite: SQLite, private utils: UtilsService) {
    this.plt.ready().then(() => {
      this.sqlite.create({
          name: 'tracker.db',
          location: 'default'
        })
        .then((db: SQLiteObject) => {


          db.executeSql('CREATE TABLE IF NOT EXISTS dateused(id INTEGER PRIMARY KEY AUTOINCREMENT,fecha VARCHAR NOT NULL);', [])
            .then(() => console.log('Executed SQL'))
            .catch(e => console.log(e));

          this.database = db;
        })
        .catch(e => console.log(e));


    });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  loadDates() {
    return this.database.executeSql('SELECT * FROM dateused', []);
  }

  addDate(fecha) {
    let date = this.formatDate(new Date(fecha))

    this.database.executeSql('SELECT * FROM dateused', []).then(data => {
      let auxBool=true;
      if (data.rows.length > 0) {
        
        for (var i = 0; i < data.rows.length; i++) {
          console.log("En DB:",data.rows.item(i).fecha)
          console.log("Entrando:",date)
            if(data.rows.item(i).fecha===date){
              this.utils.presentAlert("Error", "La fecha ya existe dentro de los registros", [{
                text: "Ok!",
              }]);
              auxBool=false;
            }
        }
      }
      if(auxBool){
      return this.database.executeSql('INSERT INTO dateused (fecha) VALUES (?)',[date])
  
      }
    });
  }

  deleteDate(id) {
    return this.database.executeSql('DELETE FROM dateused WHERE id = ?', [id])
  }


  formatDate(date) {
    console.log(date)
    var monthNames = [
      "Enero", "Febrero", "Marzo",
      "Abril", "Mayo", "Junio", "Julio",
      "Agosto", "Septiembre", "Octubre",
      "Noviembre", "Diciembre"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }
}