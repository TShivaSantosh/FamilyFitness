import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FitnessDetailsPage } from './fitness-details.page';

const routes: Routes = [
  {
    path: '',
    component: FitnessDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FitnessDetailsPageRoutingModule {}
