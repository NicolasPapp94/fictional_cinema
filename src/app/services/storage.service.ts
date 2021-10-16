import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setValue = async (key, value) => {
    await Storage.set({
      key,
      value
    });
  };

  getValue = async (key) => {
    let data = await Storage.get({ key: key });
    return data;
  }



}
