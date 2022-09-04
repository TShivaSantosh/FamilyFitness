import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LinkedTrackersPage } from './linked-trackers.page';

const routes: Routes = [
  {
    path: '',
    component: LinkedTrackersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LinkedTrackersPageRoutingModule {}
