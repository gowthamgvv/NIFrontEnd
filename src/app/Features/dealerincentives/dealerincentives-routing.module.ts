import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealerIncentivesComponent } from './dealerincentives.component';

const routes: Routes = [{ path: '', component: DealerIncentivesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealerIncentivesRoutingModule { }
