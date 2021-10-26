import { ViewIncentiveComponent } from './Features/view-incentive/view-incentive.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './Core/_guards/auth/auth.guard';
import { LoginComponent } from './Authentication/login/login.component';
import { DashboardComponent } from './Features/dashboard/dashboard.component';
import { ProfileComponent } from './Features/profile/profile.component';
import { DealerIncentivesComponent } from './Features/dealerincentives/dealerincentives.component'; 
import {InventoryAnalysisComponent} from './Features/inventory-analysis/inventory-analysis.component'

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {​​​​​​​​ path:'dashboard', loadChildren: () =>import('./Features/dashboard/dashboard.module').then(m=>m.DashboardModule), canActivate: [AuthGuard] }​​​​​​​​,
  {​​​​​​​​ path:'dashboard2', loadChildren: () =>import('./Features/view-incentive/view-incentive.module').then(m=>m.ViewIncentiveModule), canActivate: [AuthGuard] }​​​​​​​​,
  {​​​​​​​​ path:'userprofile', loadChildren: () =>import('./Features/profile/profile.module').then(m=>m.ProfileModule), canActivate: [AuthGuard] }​​​​​​​​,
  {​​​​​​​​ path:'New Incentives', loadChildren: () =>import('./Features/dealerincentives/dealerincentives.module').then(m=>m.DealerIncentivesModule), canActivate: [AuthGuard] }​​​​​​​​,
  { path:'Dealer Incentives', loadChildren: () =>import('./Features/incentives/incentives.module').then(m=>m.IncentivesModule), canActivate: [AuthGuard] },
  { path:'DealerTerms', loadChildren: () => import('./Features/dealerbrandterms/dealerbrandterms.module').then(m => m.DealerbrandtermsModule) },
  { path:'Recommendations', loadChildren: () =>import('./Features/recommendations/recommendations.module').then(m=>m.RecommendationsModule),canActivate:[AuthGuard]},
  { path:'DealerInventory', loadChildren: () =>import('./Features/inventory-analysis/inventory-analysis.module').then(m=>m.InventoryAnalysisModule), canActivate: [AuthGuard] },
  { path:'inventoryanalysis', loadChildren: () =>import('./Features/dealer-inventory-analysis/dealer-inventory-analysis.module').then(m=>m.DealerInventoryAnalysisModule), canActivate: [AuthGuard] },
  { path:'incentivepooldetails', loadChildren: () =>import('./Features/detaildealerincentive/detaildealerincentive.module').then(m=>m.DetaildealerincentiveModule), canActivate: [AuthGuard] },
  { path: 'Profile', loadChildren: () => import('./Features/userprofile/userprofile.module').then(m => m.UserprofileModule),canActivate:[AuthGuard] },

  {
    path: '', 
    canActivate: [AuthGuard],
    children: [],
  },
  { path:'dealersetup', loadChildren: () =>import('./Features/dealersetup/dealersetup.module').then(m=>m.DealersetupModule),canActivate:[AuthGuard]},
  // { path: 'consumerIncentives', loadChildren: () => import('./Features/consumer-incentives/consumer-incentives.module').then(m => m.ConsumerIncentivesModule) },
  { path: 'consumerIncentives/:id', loadChildren: () => import('./Features/consumer-incentives/consumer-incentives.module').then(m => m.ConsumerIncentivesModule) },
  { path: 'consumerIncentives', loadChildren: () => import('./Features/consumerincentives-new/consumerincentives-new.module').then(m => m.ConsumerincentivesNewModule) },
  { path: 'messenger', loadChildren: () => import('./Features/messenger/messenger.module').then(m => m.MessengerModule) },
  {
    path: '**', 
    redirectTo: '',
    pathMatch: 'full', 
  },
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {​​​​​​​​ useHash: false , onSameUrlNavigation: 'reload'}​​​​​​​​)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 