import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumerIncentivesRoutingModule } from './consumer-incentives-routing.module';
import { ConsumerIncentivesComponent } from './consumer-incentives.component';
import { FeaturesModule } from '../Features.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Routes, RouterModule } from '@angular/router';



@NgModule({
  declarations: [ConsumerIncentivesComponent],
  imports: [
    CommonModule,
    ConsumerIncentivesRoutingModule,
    FeaturesModule,
    FormsModule,ReactiveFormsModule,SlickCarouselModule
  ]
})
export class ConsumerIncentivesModule { }
