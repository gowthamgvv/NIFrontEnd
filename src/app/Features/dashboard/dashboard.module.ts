import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FeaturesModule } from '../Features.module';
import { PipesModule } from '../../Core/_pipes/pipes.module';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalDialogModule } from '../../Shared/modal-dialog/modal-dialog.module';
import { StoreIncentivesComponent } from './../../Partials/dashboard/store-incentives/store-incentives.component';
import { RecomndInventoryComponent } from './../../Partials/dashboard/recomnd-inventory/recomnd-inventory.component';
import { InventoryComponent } from './../../Partials/dashboard/inventory/inventory.component';
import { DealerStoresComponent } from './../../Partials/dashboard/dealer-stores/dealer-stores.component';
import { BonusTermsComponent } from './../../Partials/dashboard/bonus-terms/bonus-terms.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [DashboardComponent, StoreIncentivesComponent, RecomndInventoryComponent, InventoryComponent, DealerStoresComponent, BonusTermsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    FeaturesModule,
    PipesModule,
    ModalDialogModule,
    NgxSpinnerModule
  ],
  exports:[ StoreIncentivesComponent, RecomndInventoryComponent, InventoryComponent, DealerStoresComponent, BonusTermsComponent]
})
export class DashboardModule { }