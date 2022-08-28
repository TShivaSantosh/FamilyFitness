import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FitnessDetailsPageRoutingModule } from './fitness-details-routing.module';

import { FitnessDetailsPage } from './fitness-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FitnessDetailsPageRoutingModule
  ],
  declarations: [FitnessDetailsPage]
})
export class FitnessDetailsPageModule {}
