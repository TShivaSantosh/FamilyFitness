import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvailableTrackersComponent } from './available-trackers.component';
import { IonicModule } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [AvailableTrackersComponent],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [AvailableTrackersComponent]
})
export class AvailableTrackersModule { }
