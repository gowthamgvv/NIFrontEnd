import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DetaildealerincentiveComponent} from './detaildealerincentive.component'
const routes: Routes = [{ path: '', component: DetaildealerincentiveComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetaildealerincentiveRoutingModule { }
