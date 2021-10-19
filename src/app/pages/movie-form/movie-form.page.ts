import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { v4 as uuidv4 } from 'uuid'
@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.page.html',
  styleUrls: ['./movie-form.page.scss'],
})
export class MovieFormPage implements OnInit {
  movieForm: FormGroup;
  submitted = false;
  movieID = null;
  companyID = "";
  movieItem;
  headerName = "Add Movie";
  constructor(private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private _toastService: ToastService,
    private _storageService: StorageService) {
    this.initForm();
  }

  async ngOnInit() {
    this._storageService.getValue('userData').then((userData) => {
      this.companyID = JSON.parse(userData.value).id;
    });

    this.activatedRoute.paramMap.subscribe((data) => {
      this.movieID = data.get('id');

      if (this.movieID != null && this.movieID != "") {
        this.headerName = "Edit Movie";
        this._storageService.getValue('movies').then((moviesInfo) => {
          let arrayMovies = JSON.parse(moviesInfo.value);
          this.movieItem = arrayMovies.filter(movie => movie.movieID == data.get('id'))[0];
          this.initForm(this.movieItem.movieName, this.movieItem.movieData, this.movieItem.movieDescription, this.movieItem.movieRating)
        })
      }
    });



  }

  get errorCtr() {
    return this.movieForm.controls;
  }

  initForm(movieName = '', movieDate = new Date().toISOString(), movieDescription = '', movieRating = 3) {
    this.movieForm = this.formBuilder.group({
      movieName: [movieName, [Validators.required]],
      movieDate: [movieDate, [Validators.required]],
      movieDescription: [movieDescription, [Validators.required]],
      movieRating: [movieRating, [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.movieForm.valid) {
      this._toastService.simpleToast("Something are wrong!", "danger", "top");
      return false;
    } else {
      this._storageService.getValue('movies').then((storageInfo) => {
        let localStorageInfo = JSON.parse(storageInfo.value);
        if (this.movieID != null && this.movieID != "") {
          this.editMovie(localStorageInfo);
        } else {
          this.addNewMovie(localStorageInfo);
        }
        this._toastService.simpleToast("Movie saved!", "success", "top");
        this.clearForm();
        this.router.navigate(["movies"]);
      })
    }
  }

  clearForm() {
    this.submitted = false;
    this.movieForm.patchValue({ movieRating: '3' })
    this.movieForm.reset();
  }

  addNewMovie(localStorageInfo) {
    this.movieForm.value['movieID'] = uuidv4();
    this.movieForm.value['companyID'] = this.companyID;
    if (localStorageInfo == null) {
      let temporalObject = [];
      temporalObject.push(this.movieForm.value);
      this._storageService.setValue('movies', JSON.stringify(temporalObject));
    } else {
      localStorageInfo.push(this.movieForm.value);
      this._storageService.setValue('movies', JSON.stringify(localStorageInfo));
    }
  }

  editMovie(localStorageInfo) {
    let temporalID;
    let editIndex;
    localStorageInfo.forEach((element, index) => {
      if (element.movieID == this.movieID) {
        temporalID = element.id;
        editIndex = index;
      }
    });
    this.movieForm.value["movieID"] = this.movieID;
    this.movieForm.value["companyID"] = this.companyID;
    localStorageInfo[editIndex] = this.movieForm.value;
    this._storageService.setValue('movies', JSON.stringify(localStorageInfo));
  }
}
