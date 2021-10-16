import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  showDetail() {
    this.router.navigate(["movies/movie-detail"])
  }

  addMovie() {
    this.router.navigate(["movies/movie-form"])
  }

}
