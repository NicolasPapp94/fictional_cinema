import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Movies', url: 'movies', icon: 'videocam' },
    { title: 'Add Movie', url: 'movies/movie-form', icon: 'add' },
  ];
  constructor() { }
}
