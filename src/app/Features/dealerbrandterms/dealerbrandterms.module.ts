import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { DealerbrandtermsRoutingModule } from './dealerbrandterms-routing.module';
import { DealerbrandtermsComponent } from './dealerbrandterms.component';
import { FeaturesModule } from '../Features.module';


@NgModule({
  declarations: [DealerbrandtermsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FeaturesModule,
    DealerbrandtermsRoutingModule
  ]
})
export class DealerbrandtermsModule { }
