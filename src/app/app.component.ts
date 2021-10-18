import { Component } from '@angular/core';
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
    { title: 'Movies', url: 'movies', icon: 'videocam' },
    { title: 'Add Movie', url: 'movies/movie-form', icon: 'add' },
    { title: 'Logout', url: 'login', icon: 'log-out' },
  ];
  constructor(private _storageService: StorageService) { }

  ngOnInit() {
    this._storageService.getValue('userData').then((userData) => {
      let parsedData = JSON.parse(userData.value);
      this.cinemaName = parsedData.companyName;
      this.cinemaImage = parsedData.companyImage;
      this.cinemaAdress = parsedData.companyAdress
    })
  }
}
