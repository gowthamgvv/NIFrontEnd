import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncentivesComponent } from './incentives.component';

const routes: Routes = [{ path: '', component: IncentivesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncentivesRoutingModule { }
