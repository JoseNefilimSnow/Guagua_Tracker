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
  public arrayLogs=[];

  constructor(private db:DatabaseService,private utils:UtilsService, private navcntr:NavController) { }

  ngOnInit() {
    this.arrayLogs=[];
    this.db.loadDates().then(data => {
      let arrayAux=[]
      if (data.rows.length > 0) {
        
        for (var i = 0; i < data.rows.length; i++) {
 
          arrayAux.push({ 
            id: data.rows.item(i).id,
            fecha: data.rows.item(i).fecha
           });
        }
      }
      for(let item of arrayAux){
        this.arrayLogs.push({ 
          id: item.id,
          fecha: this.formatDate(new Date(item.fecha))
         });
      }
    });
  }


  delete(i){
    console.log(this.arrayLogs[i])
    this.db.deleteDate(this.arrayLogs[i].id).then(_=>{
      this.ngOnInit();
    })
  }

  close(){
    this.navcntr.pop();
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
