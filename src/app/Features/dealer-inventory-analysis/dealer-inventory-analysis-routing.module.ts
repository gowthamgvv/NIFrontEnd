import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DealerInventoryAnalysisComponent } from './dealer-inventory-analysis.component'
const routes: Routes = [{ path: '', component: DealerInventoryAnalysisComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealerInventoryAnalysisRoutingModule { }
