import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ConsumerincentivesNewRoutingModule } from './consumerincentives-new-routing.module';
import { ConsumerincentivesNewComponent } from './consumerincentives-new.component';
import { FeaturesModule } from '../Features.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../Core/_pipes/pipes.module'


@NgModule({
  declarations: [ConsumerincentivesNewComponent],
  imports: [
    CommonModule,
    ConsumerincentivesNewRoutingModule,
    FeaturesModule,
    FormsModule, ReactiveFormsModule, PipesModule
  ]
})
export class ConsumerincentivesNewModule { }
