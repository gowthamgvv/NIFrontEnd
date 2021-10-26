import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendationsRoutingModule } from './recommendations-routing.module';
import { RecommendationsComponent } from './recommendations.component';
import { FeaturesModule } from '../Features.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Routes, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [RecommendationsComponent],
  imports: [
    CommonModule,
    RecommendationsRoutingModule,
    FeaturesModule,
    FormsModule,ReactiveFormsModule,SlickCarouselModule, NgxSpinnerModule, NgbModule
  ]
})
export class RecommendationsModule { }
