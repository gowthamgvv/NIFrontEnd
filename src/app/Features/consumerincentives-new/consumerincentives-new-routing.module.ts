import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsumerincentivesNewComponent } from './consumerincentives-new.component';

const routes: Routes = [{ path: '', component: ConsumerincentivesNewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumerincentivesNewRoutingModule { }
