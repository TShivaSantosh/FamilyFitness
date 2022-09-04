import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LinkedTrackersPageRoutingModule } from './linked-trackers-routing.module';

import { LinkedTrackersPage } from './linked-trackers.page';
import { ManageTrackersModule } from '../manage-trackers/manage-trackers.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LinkedTrackersPageRoutingModule,
    ManageTrackersModule
  ],
  declarations: [LinkedTrackersPage]
})
export class LinkedTrackersPageModule {}
