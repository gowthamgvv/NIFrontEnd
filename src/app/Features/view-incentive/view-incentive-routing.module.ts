import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewIncentiveComponent } from './view-incentive.component';

const routes: Routes = [{ path: '', component: ViewIncentiveComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewIncentiveRoutingModule { }