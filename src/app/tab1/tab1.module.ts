import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { AvailableTrackersModule } from '../available-trackers/available-trackers.module';
import { LinkedTrackersModule } from '../linked-trackers/linked-trackers.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    AvailableTrackersModule,
    LinkedTrackersModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
