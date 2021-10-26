import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealertermsComponent } from './dealerterms.component';

const routes: Routes = [{ path: '', component: DealertermsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealertermsRoutingModule { }
