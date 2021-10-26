import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserprofileRoutingModule } from './userprofile-routing.module';
import { UserprofileComponent } from './userprofile.component';
import { FeaturesModule } from '../../Features/Features.module';
import { PipesModule } from '../../Core/_pipes/pipes.module';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [UserprofileComponent],
  imports: [
    CommonModule,
    UserprofileRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    FeaturesModule,
    PipesModule,
    TextMaskModule,
    ImageCropperModule
  ]
})
export class UserprofileModule { }
