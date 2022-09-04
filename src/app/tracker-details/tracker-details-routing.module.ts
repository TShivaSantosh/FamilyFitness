import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackerDetailsPage } from './tracker-details.page';

const routes: Routes = [
  {
    path: '',
    component: TrackerDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackerDetailsPageRoutingModule {}
