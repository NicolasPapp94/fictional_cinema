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
      let modifiedArray = arrayMovies.filter(movie => movie.id != movieID);
      this._storageService.setValue('movies', JSON.stringify(modifiedArray));
    })
  }

  addMovie(movie) {
    this._storageService.getValue('movies').then((storageInfo) => {
      let localStorageInfo = JSON.parse(storageInfo.value);
      movie.value['id'] = uuidv4();
      if (localStorageInfo == null) {
        let temporalObject = [];
        temporalObject.push(movie.value);
        this._storageService.setValue('movies', JSON.stringify(temporalObject));
      } else {
        localStorageInfo.push(movie.value);
        this._storageService.setValue('movies', JSON.stringify(localStorageInfo));
      }
    })
  }

}
