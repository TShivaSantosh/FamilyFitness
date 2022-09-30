import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { TrackerDetailsPageRoutingModule } from './tracker-details-routing.module';
import { TrackerDetailsPage } from './tracker-details.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    TrackerDetailsPageRoutingModule
  ],
  declarations: [TrackerDetailsPage],
  exports: [TrackerDetailsPage]
})
export class TrackerDetailsPageModule {}
