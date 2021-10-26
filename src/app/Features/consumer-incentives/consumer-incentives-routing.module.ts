import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsumerIncentivesComponent } from './consumer-incentives.component';

const routes: Routes = [{ path: '', component: ConsumerIncentivesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumerIncentivesRoutingModule { }
