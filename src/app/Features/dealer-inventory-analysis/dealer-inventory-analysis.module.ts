import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealerInventoryAnalysisRoutingModule } from './dealer-inventory-analysis-routing.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Routes, RouterModule } from '@angular/router';
import { FeaturesModule } from '../Features.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DealerInventoryAnalysisComponent } from './dealer-inventory-analysis.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalDialogModule } from '../../Shared/modal-dialog/modal-dialog.module';


@NgModule({
  declarations: [DealerInventoryAnalysisComponent],
  imports: [
    CommonModule,
    DealerInventoryAnalysisRoutingModule,
    FeaturesModule,FormsModule, ReactiveFormsModule, SlickCarouselModule,
    NgbModule, NgxSpinnerModule,ModalDialogModule
  ]
})
export class DealerInventoryAnalysisModule { }
