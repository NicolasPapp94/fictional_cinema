import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpService: HttpService) { }


  doLogin() {
    const url = "../../../../assets/json/loginData.json";
    return this._httpService.get(url);
  }
}
