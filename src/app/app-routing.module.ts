import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'linked-trackers',
    loadChildren: () => import('./linked-trackers/linked-trackers.module').then( m => m.LinkedTrackersPageModule)
  },
  {
    path: 'family-fitness-summary',
    loadChildren: () => import('./family-fitness-summary/family-fitness-summary.module').then( m => m.FamilyFitnessSummaryPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
