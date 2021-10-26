import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealersetupComponent } from './dealersetup.component';

const routes: Routes = [{ path: '', component: DealersetupComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealersetupRoutingModule { } 
