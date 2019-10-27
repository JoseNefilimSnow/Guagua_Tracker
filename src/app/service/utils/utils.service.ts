import {
  Injectable
} from '@angular/core';
import {
  AlertController,
  ToastController
} from '@ionic/angular';
import { AlertButton } from '@ionic/core';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private alrtCtrl: AlertController, private toastCtrl: ToastController) {}

  async presentAlert(header: string,
    message: string,
    buttons: AlertButton[],
    subHeader ? : string,
    inputs ? : [{}]) {

    let alrt = await this.alrtCtrl.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: buttons,
      inputs: inputs
    })
    await alrt.present();

  }
}