
import { PipesModule } from './../Core/_pipes/pipes.module';
import { FeaturesRoutingModule } from '../Features/Features-routing.module';
import { LeftPanelComponent } from './../Layout/left-panel/left-panel.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './../Layout/header/header.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { ChartComponent } from './chart/chart.component';
import { InventoryAnalysisComponent } from './inventory-analysis/inventory-analysis.component';
import { DetaildealerincentiveComponent } from './detaildealerincentive/detaildealerincentive.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
// import { ConsumerincentivesNewComponent } from './consumerincentives-new/consumerincentives-new.component';
// import { DealerInventoryAnalysisComponent } from './dealer-inventory-analysis/dealer-inventory-analysis.component';
 
 
@NgModule({
    declarations: [ ChartComponent,LeftPanelComponent,HeaderComponent, InventoryAnalysisComponent, DetaildealerincentiveComponent],
    imports: [    
      CommonModule,
      NgxSpinnerModule,
      FeaturesRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      MatMenuModule,
      MatDialogModule,
      PipesModule,   
    ],
    exports:[HeaderComponent, LeftPanelComponent,],
    
  })
  export class FeaturesModule { }