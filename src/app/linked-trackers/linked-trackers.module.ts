import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkedTrackersComponent } from './linked-trackers.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [LinkedTrackersComponent],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [LinkedTrackersComponent]
})
export class LinkedTrackersModule { }
