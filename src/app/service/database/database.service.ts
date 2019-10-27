import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject } from 'rxjs';
 
 
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
 
  dates = new BehaviorSubject([]);
 
  constructor(private plt: Platform, private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'tracker.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
      
      
          db.executeSql('CREATE TABLE IF NOT EXISTS dateused(id INTEGER PRIMARY KEY AUTOINCREMENT,fecha DATE);', [])
            .then(() => console.log('Executed SQL'))
            .catch(e => console.log(e));
      
          this.database=db;
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
    let data = [fecha];
    return this.database.executeSql('INSERT INTO dateused (fecha) VALUES (?)', data).then(data => {
      this.loadDates();
    });
  }

  deleteDate(id) {
    return this.database.executeSql('DELETE FROM dateused WHERE id = ?', [id])
  }

  updateDate(log) {
    let data = log.fecha;
    return this.database.executeSql(`UPDATE dateused SET fecha = ? WHERE id = ${log.id}`, data).then(data => {
      this.loadDates();
    })
  }

}

