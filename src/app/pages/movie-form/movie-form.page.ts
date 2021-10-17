import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
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


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private _toastService: ToastService,
    private _storageService: StorageService,
    private _movieService: MovieService) { }

  async ngOnInit() {
    this.movieForm = this.formBuilder.group({
      movieName: ['', [Validators.required]],
      movieDate: [new Date().toISOString(), [Validators.required]],
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
      this._toastService.simpleToast("Something are wrong!", "danger", "top");
      return false;
    } else {
      this._movieService.addMovie(this.movieForm);
      this._toastService.simpleToast("Movie saved!", "success", "top");
      this.submitted = false;
      this.movieForm.patchValue({ movieRating: '3' })
      this.movieForm.reset();
      this.router.navigate(["movies"]);
    }
  }

}
