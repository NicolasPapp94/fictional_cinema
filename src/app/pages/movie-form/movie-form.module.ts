import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieFormPageRoutingModule } from './movie-form-routing.module';

import { MovieFormPage } from './movie-form.page';
import { BarRatingModule } from 'ngx-bar-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieFormPageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BarRatingModule
  ],
  declarations: [MovieFormPage]
})
export class MovieFormPageModule { }
