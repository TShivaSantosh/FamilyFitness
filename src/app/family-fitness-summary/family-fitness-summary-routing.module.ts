import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamilyFitnessSummaryPage } from './family-fitness-summary.page';

const routes: Routes = [
  {
    path: '',
    component: FamilyFitnessSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamilyFitnessSummaryPageRoutingModule {}
