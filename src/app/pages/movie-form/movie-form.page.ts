import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.page.html',
  styleUrls: ['./movie-form.page.scss'],
})
export class MovieFormPage implements OnInit {
  movieForm: FormGroup;
  submitted = false;


  constructor(private formBuilder: FormBuilder,
    private _toastService: ToastService,
    private _storageService: StorageService) { }

  async ngOnInit() {
    this.movieForm = this.formBuilder.group({
      movieName: ['', [Validators.required]],
      movieDate: ['', [Validators.required]],
      movieDescription: ['', [Validators.required]],
      movieRating: ['3', [Validators.required]],
    })


  }

  get errorCtr() {
    return this.movieForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.movieForm.valid) {
      this._toastService.simpleToast("Something are wrong!", "danger", "top")
      return false;
    } else {
      this._storageService.getValue('movies').then((storageInfo) => {
        let localStorageInfo = JSON.parse(storageInfo.value);
        if (localStorageInfo == null) {
          let temporalObject = [];
          temporalObject.push(this.movieForm.value);
          this._storageService.setValue('movies', JSON.stringify(temporalObject));
        } else {
          localStorageInfo.push(this.movieForm.value);
          this._storageService.setValue('movies', JSON.stringify(localStorageInfo));
        }
      })
    }
  }

}
