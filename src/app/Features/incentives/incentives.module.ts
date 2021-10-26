import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncentivesRoutingModule } from './incentives-routing.module';
import { IncentivesComponent } from './incentives.component';
import { FeaturesModule } from '../Features.module';
import { PipesModule } from '../../Core/_pipes/pipes.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { SelectBoxComponent} from '../../Partials/incentives/select-box/select-box.component';
import { Routes, RouterModule } from '@angular/router';
import { DragNDropComponent } from '../../Partials/incentives/drag-n-drop/drag-n-drop.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalDialogModule } from '../../Shared/modal-dialog/modal-dialog.module';

@NgModule({
  declarations: [IncentivesComponent,SelectBoxComponent, DragNDropComponent],
  imports: [
    CommonModule,
    IncentivesRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    FeaturesModule,
    PipesModule, 
    DragDropModule,
    AngularMultiSelectModule,
    ModalDialogModule
  ],
})
export class IncentivesModule { }
