import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageTrackersComponent } from './manage-trackers.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ManageTrackersComponent],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [ManageTrackersComponent]
})
export class ManageTrackersModule { }
