import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { v4 as uuidv4 } from 'uuid'

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private _storageService: StorageService) {

  }

  deleteMovie(movieID) {
    this._storageService.getValue('movies').then((moviesInfo) => {
      let arrayMovies = JSON.parse(moviesInfo.value);
      let modifiedArray = arrayMovies.filter(movie => movie.movieID != movieID);
      this._storageService.setValue('movies', JSON.stringify(modifiedArray));
    })
  }


}
