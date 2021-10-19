import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  sessionEvent = new BehaviorSubject(null);

  constructor(private _storageService: StorageService) { }


  setInitializedSession() {
    this.sessionEvent.next("new User Logged In");
  }

  getInitializedSessionEvent() {
    return this.sessionEvent;
  }

  registerUser(loginForm, image) {
    let temporalData = loginForm;
    temporalData.image = image;
    temporalData.id = uuidv4();
    this._storageService.getValue('users').then((storageInfo) => {
      let localStorageInfo = JSON.parse(storageInfo.value);
      if (localStorageInfo == null) {
        let temporalObject = [];
        temporalObject.push(temporalData);
        this._storageService.setValue('users', JSON.stringify(temporalObject));
      } else {
        localStorageInfo.push(temporalData);
        this._storageService.setValue('users', JSON.stringify(localStorageInfo));
      }
    })
  }

}
