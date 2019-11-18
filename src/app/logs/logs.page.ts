import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../service/database/database.service';
import { UtilsService } from '../service/utils/utils.service';
import { NavController } from '@ionic/angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.page.html',
  styleUrls: ['./logs.page.scss'],
})
export class LogsPage implements OnInit {
  public arrayLogs = [];

  constructor(private db: DatabaseService, private utils: UtilsService, private navcntr: NavController) { }

  ngOnInit() { }

  ionViewDidEnter() {
    this.arrayLogs = [];
    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {

        this.db.loadDates().then(data => {
          let arrayAux = []
          if (data.rows.length > 0) {

            for (var i = 0; i < data.rows.length; i++) {

              this.arrayLogs.push({
                id: data.rows.item(i).id,
                fecha: data.rows.item(i).fecha
              });
            }
          }
        });
      }
    })
  }


  delete(i) {
    console.log(this.arrayLogs[i])
    this.db.deleteDate(this.arrayLogs[i].id).then(_ => {
      this.ngOnInit();
    })
  }
  info() {
    this.utils.presentAlert("Consejo", "Puedes borrar entradas individuales de fechas deslizando los elementos de la lista a la izquierda y pulsando el boton rojo", [{ text: "Entendido" }])
  }
  deleteAll() {
    this.db.deleteAll();
  }
  close() {
    this.navcntr.pop();
  }

}
