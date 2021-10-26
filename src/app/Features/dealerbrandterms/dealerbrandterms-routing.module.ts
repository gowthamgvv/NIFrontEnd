import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealerbrandtermsComponent } from './dealerbrandterms.component';

const routes: Routes = [{ path: '', component: DealerbrandtermsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealerbrandtermsRoutingModule { }
