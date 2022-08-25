import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvailableTrackersComponent } from './available-trackers.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [AvailableTrackersComponent],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [AvailableTrackersComponent]
})
export class AvailableTrackersModule { }
