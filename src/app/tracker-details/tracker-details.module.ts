import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackerDetailsPageRoutingModule } from './tracker-details-routing.module';

import { TrackerDetailsPage } from './tracker-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackerDetailsPageRoutingModule
  ],
  declarations: [TrackerDetailsPage]
})
export class TrackerDetailsPageModule {}
