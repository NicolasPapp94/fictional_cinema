import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesPage } from './movies.page';

const routes: Routes = [
  {
    path: '',
    component: MoviesPage
  },
  {
    path: 'movie-detail/:id',
    loadChildren: () => import('../movie-detail/movie-detail.module').then(m => m.MovieDetailPageModule)
  },
  {
    path: 'movie-form',
    loadChildren: () => import('../movie-form/movie-form.module').then(m => m.MovieFormPageModule)
  },
  {
    path: 'movie-form/:id',
    loadChildren: () => import('../movie-form/movie-form.module').then(m => m.MovieFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesPageRoutingModule { }
