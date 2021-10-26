import { PswrdPopupComponent } from './../../Partials/profile/pswrd-popup/pswrd-popup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { FeaturesModule } from '../Features.module';
import { PipesModule } from '../../Core/_pipes/pipes.module';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';


@NgModule({
  declarations: [ProfileComponent,PswrdPopupComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    FeaturesModule,
    PipesModule,
    TextMaskModule
   ],
   exports:[PswrdPopupComponent]
})
export class ProfileModule { }
