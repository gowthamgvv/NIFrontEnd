import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DealersetupRoutingModule } from './dealersetup-routing.module';
import { DealersetupComponent } from './dealersetup.component';
import { FeaturesModule } from '../Features.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { TextMaskModule } from 'angular2-text-mask';
import { UsersComponent } from '../../Partials/dealersetup/users/users.component';
import { DealertermsComponent } from '../../Partials/dealersetup/dealerterms/dealerterms.component';
import { GroupsComponent } from '../../Partials/dealersetup/groups/groups.component';
import { RolesComponent } from '../../Partials/dealersetup/roles/roles.component';
import { PipesModule } from '../../Core/_pipes/pipes.module';




@NgModule({
  declarations: [DealersetupComponent,
  UsersComponent,
  DealertermsComponent,
  GroupsComponent,
  RolesComponent
  ],
  imports: [
    CommonModule,
    DealersetupRoutingModule, 
    FeaturesModule,
    FormsModule, ReactiveFormsModule,
    NgxSliderModule,
    TextMaskModule,
    PipesModule    
  ]
})
export class DealersetupModule { }
