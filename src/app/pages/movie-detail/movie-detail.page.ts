import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController,
    private _storageService: StorageService,
    private _movieService: MovieService,
  ) { }
  movieItem = {};
  movieStars = ["star-outline", "star-outline", "star-outline", "star-outline", "star-outline"];
  movieID;
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((data) => {
      this.movieID = data.get('id');
      this._storageService.getValue('movies').then((moviesInfo) => {
        let arrayMovies = JSON.parse(moviesInfo.value);
        this.movieItem = arrayMovies.filter(movie => movie.movieID == data.get('id'))[0];
        this.movieStars.fill('star', 0, this.movieItem['movieRating']);
        this.movieStars.fill('star-outline', this.movieItem['movieRating'], 5);
      })
    });
  }

  async deleteMovie() {
    this.confirmationMessage();
  }

  editMovie() {
    this.router.navigate(["movies/movie-form/" + this.movieID]);
  }

  async confirmationMessage() {
    const alert = await this.alertCtrl.create({
      header: 'Attention!',
      message: 'Are you sure you want to delete the movie?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }, {
          text: 'Confirm',
          handler: () => {
            this._movieService.deleteMovie(this.movieID);
            this.router.navigate(["movies"]);
          }
        }
      ]
    });

    await alert.present();
  }


}
