import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  cinemaName = "NONE";
  cinemaAdress = "NONE";
  cinemaImage = "assets/images/noImage.png";
  public appPages = [
    { title: 'Logout', url: 'login', icon: 'log-out' },
  ];
  constructor(private _storageService: StorageService,
    private _authService: AuthService) { }

  ngOnInit() {
    this._authService.getInitializedSessionEvent().subscribe(() => {
      this._storageService.getValue('userData').then((userData) => {
        let parsedData = JSON.parse(userData.value);
        this.cinemaName = parsedData?.username;
        this.cinemaImage = parsedData?.image;
      })
    })
  }
}
