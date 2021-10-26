import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewIncentiveRoutingModule } from './view-incentive-routing.module';
import { ViewIncentiveComponent } from './view-incentive.component';
import { FeaturesModule } from '../Features.module';
import { PipesModule } from '../../Core/_pipes/pipes.module';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalDialogModule } from '../../Shared/modal-dialog/modal-dialog.module';
import { IncentiveStatsComponent } from './../../Partials/view-incentive/incentive-stats/incentive-stats.component';



@NgModule({
  declarations: [ViewIncentiveComponent,IncentiveStatsComponent],
  imports: [
    CommonModule,
    ViewIncentiveRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    FeaturesModule,
    PipesModule,
    ModalDialogModule
  ],
  exports:[IncentiveStatsComponent ]
})
export class ViewIncentiveModule { }