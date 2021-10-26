import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DealertermsRoutingModule } from './dealerterms-routing.module';
import { DealertermsComponent } from './dealerterms.component';
import { FeaturesModule } from '../../../Features/Features.module';
import { PipesModule } from '../../../Core/_pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DealertermsComponent],
  imports: [
    CommonModule,
    DealertermsRoutingModule,
    FeaturesModule,
    PipesModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class DealertermsModule { }
