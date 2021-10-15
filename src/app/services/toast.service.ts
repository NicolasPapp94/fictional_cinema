import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl: ToastController) { }


  async simpleToast(message, color, position) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color,
      position,
      cssClass: "customToast"
    });
    toast.present();
  }
}
