import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  arrayMovies = []
  constructor(private router: Router, private _storageService: StorageService, private menu: MenuController) { }

  ngOnInit() {
    this.menu.enable(true)
  }

  ionViewWillEnter() {
    this._storageService.getValue('movies').then((moviesInfo) => {
      this.arrayMovies = JSON.parse(moviesInfo.value);
      this.arrayMovies.forEach(element => {
        let movieStars = ["0", "0", "0", "0", "0"];
        movieStars.fill('star', 0, element['movieRating']);
        movieStars.fill('star-outline', element['movieRating'], 5);
        element["movieStars"] = movieStars;
      });
    })
  }

  showDetail(id) {
    this.router.navigate(["movies/movie-detail/" + id]);
  }

  addMovie() {

    this.router.navigate(["movies/movie-form"])
  }

}
