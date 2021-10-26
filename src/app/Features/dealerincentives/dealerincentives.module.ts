import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealerIncentivesRoutingModule } from './dealerincentives-routing.module';
import { DealerIncentivesComponent } from './dealerincentives.component';
import { FeaturesModule } from '../Features.module';
import { PipesModule } from '../../Core/_pipes/pipes.module';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
// import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [DealerIncentivesComponent],
  imports: [
    CommonModule,
    DealerIncentivesRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    FeaturesModule,
    PipesModule, 
    AngularMultiSelectModule,
     
  ],
  providers:[],

})
export class DealerIncentivesModule { }
